import describeFibers from './describeFibers';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case 'BEGIN_WORK':
    case 'COMPLETE_WORK':
      return describeFibers(action.fiberRoot);
    default:
      return describeFibers(state);
  }
}
