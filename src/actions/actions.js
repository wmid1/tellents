export function authentication(header) {
  return {
    type: 'AUTHENTICATION',
    payload: header,
  };
}
export function authChange(auth) {
  return {
    type: 'AUTH_CHANGE',
    payload: auth,
  };
}
export function setProfCategories(skill) {
  return {
    type: 'SET_PROF_CATEGORIES',
    payload: skill,
  };
}
export function selectProfCategories(skill, id) {
  return {
    type: 'SELECT_PROF_CATEGORIES',
    payload: skill,
    id,
  };
}
export function selectSubSkills(id, subSkillId, subSelected) {
  return {
    type: 'SELECT_SUB_SKILLS',
    payload: id,
    subSkillId,
    subSelected,
  };
}

export function setTag(id, tag) {
  return {
    type: 'SET_TAG',
    payload: id,
    tag,
  };
}

export function delTag(id, tag) {
  return {
    type: 'DEL_TAG',
    payload: id,
    tag,
  };
}

export function addSkills(skills) {
  return {
    type: 'ADD_SKILL',
    payload: skills,
  };
}
export function delSkill(id) {
  return {
    type: 'DEL_SKILL',
    payload: id,
  };
}

export function setQueryTags(tags) {
  return {
    type: 'SET_QUERY_TAGS',
    payload: tags,
  };
}
