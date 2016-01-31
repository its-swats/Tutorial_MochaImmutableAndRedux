export function setState(state) {
  return {type: 'SET_STATE', state};
}

export function vote(entry) {
  return {type: 'VOTE', meta: {remote: true}, vote: entry};
}

export function next(entry) {
  return {type: 'NEXT', meta: {remote: true}};
}

