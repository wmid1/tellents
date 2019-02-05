import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectSubSkills, delTag } from '../../actions/actions';
import SearchTags from './SearchTags';
import '../../styles/styles.css';

class StepTwo extends Component {
  static propTypes = {
    userInfo: PropTypes.object,
    setSkillOne: PropTypes.func,
    choiceSecondSkills: PropTypes.func,
    delTags: PropTypes.func,
    firstSkillId: PropTypes.number,
  };

  deleteTag = skillTag => {
    const {
      props: { delTags, firstSkillId },
    } = this;
    delTags(firstSkillId, skillTag);
  };

  render() {
    const { professionCategories } = this.props.userInfo;
    const {
      props: { choiceSecondSkills, firstSkillId },
      deleteTag,
    } = this;
    return (
      <div>
        {professionCategories.map(
          skill =>
            skill.id === firstSkillId && (
              <div className="skill-subcat skill-subcat--item " key={skill.id}>
                <div className="flexbox justify-space-between">
                  <div className="skill-block">
                    <div className="skill-block-title ">{skill.name}</div>
                    <div className="skill-block-list">
                      {skill.skill_categories.map(subSkill => (
                        <div className="checkbox-block" key={subSkill.id}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="exampleRadios"
                            id={subSkill.id}
                            value={subSkill.selected}
                            onChange={() => choiceSecondSkills(skill.id, subSkill.id, subSkill.selected)}
                            defaultChecked={subSkill.selected && true}
                          />
                          <label htmlFor={subSkill.id}>
                            <span className="checkbox-circle">
                              <span className="icon icon-check-mark" />
                            </span>
                            <span className="checkbox-text"> {subSkill.name} </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="skill-sub-block">
                    <form className="form-group">
                      <SearchTags firstSkillId={firstSkillId} />
                    </form>
                    <div className="skill-tags-block clearfix">
                      {skill.skill_tags.map(skillTag => (
                        <div key={skillTag.id} className="skill-tag">
                          {skillTag.name}
                          <span className="close-tag" onClick={() => deleteTag(skillTag)}>
                            ×
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ),
        )}
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    userInfo: store.userInfo,
  };
}
const mapDispatchToProps = dispatch => ({
  selectSecondSkills: (id, subSkillId, subSelected) => dispatch(selectSubSkills(id, subSkillId, subSelected)),
  delTags: (id, skillTag) => dispatch(delTag(id, skillTag)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StepTwo);
