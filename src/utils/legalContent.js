const LIST_ITEM_LABEL_PATTERN = /^([A-Za-z][A-Za-z0-9 &'()/-]{1,60}):\s(.+)$/;

const parseListItem = (raw) => {
  const match = raw.match(LIST_ITEM_LABEL_PATTERN);
  if (match) {
    return { label: match[1], text: match[2] };
  }
  return { label: null, text: raw };
};

export const parseLegalContent = (markdown) => {
  const blocks = [];
  let currentList = null;

  markdown.split('\n').forEach((line) => {
    const trimmed = line.trim();

    if (!trimmed) {
      currentList = null;
      return;
    }

    if (trimmed.startsWith('## ')) {
      currentList = null;
      blocks.push({ type: 'heading', text: trimmed.slice(3) });
      return;
    }

    if (trimmed.startsWith('### ')) {
      currentList = null;
      blocks.push({ type: 'subheading', text: trimmed.slice(4) });
      return;
    }

    if (trimmed.startsWith('- ')) {
      if (!currentList) {
        currentList = { type: 'list', items: [] };
        blocks.push(currentList);
      }
      currentList.items.push(parseListItem(trimmed.slice(2)));
      return;
    }

    currentList = null;
    if (trimmed.startsWith('**') && trimmed.endsWith('**') && trimmed.length > 4) {
      blocks.push({ type: 'paragraph', text: trimmed.slice(2, -2), bold: true });
      return;
    }

    blocks.push({ type: 'paragraph', text: trimmed });
  });

  return blocks;
};
