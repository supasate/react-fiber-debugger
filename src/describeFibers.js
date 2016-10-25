let nextFiberID = 1;
const fiberIDMap = new WeakMap();

function getFiberUniqueID(fiber) {
  if (!fiberIDMap.has(fiber)) {
    fiberIDMap.set(fiber, nextFiberID++);
  }
  return fiberIDMap.get(fiber);
}

function getFriendlyTag(tag) {
  switch (tag) {
    case 0:
      return 'IndeterminateComponent';
    case 1:
      return 'FunctionalComponent';
    case 2:
      return 'ClassComponent';
    case 3:
      return 'HostContainer';
    case 4:
      return 'HostComponent';
    case 5:
      return 'HostText';
    case 6:
      return 'CoroutineComponent';
    case 7:
      return 'CoroutineHandlerPhase';
    case 8:
      return 'YieldComponent';
    case 9:
      return 'Fragment';
    default:
      throw new Error('Unknown tag');
  }
}

export default function describeFibers(rootFiber) {
  let descriptions = {};

  function acknowledgeFiber(fiber) {
    if (!fiber) {
      return null;
    }
    const id = getFiberUniqueID(fiber);
    if (descriptions[id]) {
      return id;
    }
    descriptions[id] = {};

    Object.assign(descriptions[id], {
      ...fiber,
      id: id,
      type: fiber.type && fiber.type.name,
      tag: getFriendlyTag(fiber.tag),
      stateNode: `[${typeof fiber.stateNode}]`,
      output: `[${typeof fiber.output}]`,
      return: acknowledgeFiber(fiber.return),
      child: acknowledgeFiber(fiber.child),
      sibling: acknowledgeFiber(fiber.sibling),
      nextEffect: acknowledgeFiber(fiber.nextEffect),
      firstEffect: acknowledgeFiber(fiber.firstEffect),
      lastEffect: acknowledgeFiber(fiber.lastEffect),
      progressedChild: acknowledgeFiber(fiber.progressedChild),
      progressedFirstDeletion: acknowledgeFiber(fiber.progressedFirstDeletion),
      progressedLastDeletion: acknowledgeFiber(fiber.progressedLastDeletion),
      alternate: acknowledgeFiber(fiber.alternate),
    });
    return id;
  }
  return {
    descriptions,
    rootID: acknowledgeFiber(rootFiber),
  }
}
