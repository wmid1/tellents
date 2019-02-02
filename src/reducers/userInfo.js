const initialState = {
  auth: false,
  professionCategories: [],
  selectedSkill: [],
  tags: [],
  categories: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'AUTH_CHANGE':
      return { ...state, auth: action.payload };

    /* For start step in skills */
    case 'SET_PROF_CATEGORIES': {
      const firstCategories = action.payload
        .map(skill => {
          if (skill.selected) {
            return {
              id: skill.id,
              skill_tags: skill.skill_tags,
              skill_categories: skill.skill_categories
                .map(subSkill => {
                  if (subSkill.selected) {
                    return subSkill.id;
                  }
                  return null;
                })
                .filter(x => x !== undefined && x !== null),
            };
          }
          return null;
        })
        .filter(x => x !== undefined && x !== null);
      return {
        ...state,
        professionCategories: action.payload,
        categories: firstCategories,
      };
    }

    case 'DEL_SKILL': {
      const profCategories = state.professionCategories
        .map(skill => {
          if (skill.id === action.payload) {
            return null;
          }
          return skill;
        })
        .filter(x => x !== undefined && x !== null);
      const categories = profCategories
        .map(skill => {
          if (skill.selected) {
            return {
              id: skill.id,
              skill_tags: skill.skill_tags,
              skill_categories: skill.skill_categories
                .map(subSkill => {
                  if (subSkill.selected) {
                    return subSkill.id;
                  }
                  return null;
                })
                .filter(x => x !== undefined && x !== null),
            };
          }
          return null;
        })
        .filter(x => x !== undefined && x !== null);

      return {
        ...state,
        professionCategories: profCategories,
        categories,
      };
    }
    /* For first step in skills */
    case 'SELECT_PROF_CATEGORIES': {
      const skillList = state.professionCategories.map(skill => {
        if (skill.id !== action.payload.id) {
          return { ...skill, selected: false };
        }
        return { ...skill, selected: true };
      });

      return { ...state, selectedSkill: skillList };
    }
    /* For second step in skills */
    case 'SELECT_SUB_SKILLS': {
      const skillList = state.professionCategories.map(skill => {
        if (skill.id === action.payload) {
          const subSkillList = skill.skill_categories.map(subSkill => {
            if (subSkill.id === action.subSkillId) {
              if (action.subSelected) {
                return { ...subSkill, selected: false };
              }
              return { ...subSkill, selected: true };
            }
            return subSkill;
          });
          return { ...skill, selected: true, skill_categories: subSkillList };
        }
        return skill;
      });
      const categories = skillList
        .map(skill => {
          if (skill.selected) {
            if (skill.id === action.payload) {
              const subSkillList = skill.skill_categories.map(subSkill => {
                if (subSkill.selected) {
                  return subSkill.id;
                }
                return null;
              });
              return {
                id: action.payload,
                skill_tags: skill.skill_tags,
                skill_categories: subSkillList.filter(x => x !== undefined && x !== null),
              };
            }
            return {
              id: skill.id,
              skill_tags: skill.skill_tags,
              skill_categories: skill.skill_categories
                .map(subSkill => {
                  if (subSkill.selected) {
                    return subSkill.id;
                  }
                  return null;
                })
                .filter(x => x !== undefined && x !== null),
            };
          }
          return null;
        })
        .filter(x => x !== undefined && x !== null);
      const cleanCategories = categories.filter(cat => cat.skill_categories.length !== 0);
      return { ...state, professionCategories: skillList, categories: cleanCategories };
    }

    /* For tags */
    case 'SET_QUERY_TAGS': {
      return { ...state, tags: action.payload };
    }
    case 'SET_TAG': {
      const tagList = state.professionCategories.map(skill => {
        if (skill.id === action.payload) {
          return { ...skill, selected: true, skill_tags: [...skill.skill_tags, action.tag] };
        }
        return skill;
      });
      const categories = tagList
        .map(skill => {
          if (skill.selected) {
            return {
              id: skill.id,
              skill_tags: skill.skill_tags,
              skill_categories: skill.skill_categories
                .map(subSkill => {
                  if (subSkill.selected) {
                    return subSkill.id;
                  }
                  return null;
                })
                .filter(x => x !== undefined && x !== null),
            };
          }
          return null;
        })
        .filter(x => x !== undefined && x !== null);
      const cleanCategories = categories.filter(cat => cat.skill_categories.length !== 0);
      return { ...state, professionCategories: tagList, categories: cleanCategories };
    }

    case 'DEL_TAG': {
      const tagList = state.professionCategories.map(skill => {
        if (skill.id === action.payload) {
          return {
            ...skill,
            selected: true,
            skill_tags: skill.skill_tags
              .map(tag => {
                if (tag !== action.tag) {
                  return tag;
                }
                return null;
              })
              .filter(x => x !== undefined && x !== null),
          };
        }
        return skill;
      });
      const categories = tagList
        .map(skill => {
          if (skill.selected) {
            return {
              id: skill.id,
              skill_tags: skill.skill_tags,
              skill_categories: skill.skill_categories
                .map(subSkill => {
                  if (subSkill.selected) {
                    return subSkill.id;
                  }
                  return null;
                })
                .filter(x => x !== undefined && x !== null),
            };
          }
          return null;
        })
        .filter(x => x !== undefined && x !== null);
      const cleanCategories = categories.filter(cat => cat.skill_categories.length !== 0);
      return { ...state, professionCategories: tagList, categories: cleanCategories };
    }

    default:
      return state;
  }
}
