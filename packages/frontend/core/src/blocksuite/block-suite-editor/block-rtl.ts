/**
 * Katiba: per-block RTL detection, ported from NotionFarsi-RTL v1.7.0 logic.
 *
 * The extension's trick: if a block contains any Persian/Arabic character
 * (regex /[\u0600-\u06FF]/), set dir="rtl" on it. Content decides per block —
 * English blocks stay LTR, so code blocks and English bullets never flip.
 *
 * Two deliberate improvements over the extension:
 * 1. characterData:true — typing inside an existing v-text span mutates text
 *    in place (no new nodes); without this the first Persian word typed into
 *    an empty block would not flip until Enter.
 * 2. Revert — remove dir when no Persian chars remain. The extension never
 *    removes; in an editor that leaves stuck-RTL blocks after deleting text.
 *
 * Why block-root works: BlockComponent extends ShadowlessElement (no shadow
 * DOM), so `direction` inherits from the block root through rich-text →
 * v-root → v-line → v-text automatically. No engine changes needed.
 *
 * `dir` is DOM-only, never stored in Yjs. On reload the initial scan
 * re-detects. Same tradeoff as the extension.
 */

// Persian/Arabic Unicode block — same regex as NotionFarsi-RTL.
const PERSIAN_RE = /[\u0600-\u06FF]/;

// Text blocks that participate in per-block RTL. affine-list covers
// bulleted + numbered + todo + toggle.
const RTL_BLOCK_SELECTOR =
  'affine-paragraph, affine-list, affine-callout, affine-divider';

// Never RTL, even inside a Persian doc (e.g. code samples).
const LTR_PINNED_SELECTOR = 'affine-code';

function nearestRtlBlock(el: Element | null): Element | null {
  if (!el) return null;
  if (el.closest(LTR_PINNED_SELECTOR)) return null;
  return el.closest(RTL_BLOCK_SELECTOR);
}

/** Scan one changed node; set or clear dir on its block root. */
export function scanNodeForRtl(node: Node | null) {
  if (!node) return;
  const el = node instanceof Element ? node : node.parentElement;
  const block = nearestRtlBlock(el);
  if (!block) return;
  const hasPersian = PERSIAN_RE.test(block.textContent ?? '');
  if (hasPersian) {
    if (block.getAttribute('dir') !== 'rtl') block.setAttribute('dir', 'rtl');
  } else {
    if (block.getAttribute('dir') === 'rtl') block.removeAttribute('dir');
  }
}

/** Initial pass: scan every text block already in the container. */
export function scanAllBlocks(container: HTMLElement) {
  container
    .querySelectorAll(RTL_BLOCK_SELECTOR)
    .forEach(block => scanNodeForRtl(block));
}

/**
 * Install a MutationObserver scoped to the editor container.
 * Returns a cleanup function. Callback is rAF-batched so a burst of
 * mutations (paste, sync) scans each touched block once.
 */
export function installBlockRtlObserver(container: HTMLElement): () => void {
  scanAllBlocks(container);

  let pending = new Set<Node>();
  let scheduled = false;

  const flush = () => {
    scheduled = false;
    pending.forEach(scanNodeForRtl);
    pending.clear();
  };

  const observer = new MutationObserver(mutations => {
    for (const m of mutations) {
      if (m.type === 'characterData') {
        pending.add(m.target);
      } else {
        m.addedNodes.forEach(n => pending.add(n));
      }
    }
    if (pending.size && !scheduled) {
      scheduled = true;
      requestAnimationFrame(flush);
    }
  });

  observer.observe(container, {
    childList: true,
    subtree: true,
    characterData: true,
  });

  return () => {
    observer.disconnect();
    pending.clear();
  };
}
