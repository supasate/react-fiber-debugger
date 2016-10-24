let nextFiberID = 1;
const fiberIDMap = new WeakMap();

function getFiberUniqueID(fiber) {
  if (!fiberIDMap.has(fiber)) {
    fiberIDMap.set(fiber, nextFiberID++);
  }
  return fiberIDMap.get(fiber);
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
      type: fiber.type && fiber.type.name,
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
