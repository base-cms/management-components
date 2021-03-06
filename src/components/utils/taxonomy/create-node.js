import mapNodes from '../map-nodes';

const createNode = (taxonomy, { expandedIds = [] } = {}) => {
  if (!taxonomy) return null;
  const children = mapNodes(taxonomy.children).map(t => createNode(t, { expandedIds }));
  const isActive = expandedIds.includes(taxonomy.id);
  return {
    id: taxonomy.id,
    label: `${taxonomy.name} ${taxonomy.id}`,
    title: taxonomy.fullName,
    model: taxonomy,
    ...(isActive && { isDefaultExpanded: true }),
    ...(children.length && { children }),
  };
};

export default createNode;
