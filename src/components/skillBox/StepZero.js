import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { delSkill } from '../../actions/actions';
import '../../styles/styles.css';

class StepZero extends Component {
  static propTypes = {
    userInfo: PropTypes.object,
    setSkillOne: PropTypes.func,
    delSkills: PropTypes.func,
  };

  deleteSkill = id => {
    const { delSkills } = this.props;
    delSkills(id);
  };

  render() {
    const { professionCategories } = this.props.userInfo;
    const {
      props: { setSkillOne },
      deleteSkill,
    } = this;
    return (
      <div>
        {professionCategories.map(
          skill =>
            skill.selected && (
              <div className="skill-subcat skill-subcat--item " key={skill.id}>
                <div className="flexbox justify-space-between">
                  <div className="skill-block">
                    <div className="skill-block-title ">{skill.name}</div>
                    <div className="skill-block-list">
                      {skill.skill_categories.map(
                        addedSkill =>
                          addedSkill.selected && (
                            <div className="checkbox-block" key={addedSkill.id}>
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={addedSkill.id}
                                defaultChecked={true}
                                disabled="disabled"
                              />
                              <label htmlFor={addedSkill.id}>
                                <span className="checkbox-circle">
                                  <span className="icon icon-check-mark" />
                                </span>
                                <span className="checkbox-text">{addedSkill.name}</span>
                              </label>
                            </div>
                          ),
                      )}
                    </div>
                  </div>
                  <div className="skill-sub-block">
                    <div className="skill-block-title ">Skills</div>
                    <div className="skill-tags-block clearfix">
                      {skill.skill_tags.map(skillTag => (
                        <div key={skillTag.id} className="skill-tag">
                          {skillTag.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="skill-block-footer ">
                  <Link to="#" onClick={() => deleteSkill(skill.id)}>
                    Delete
                  </Link>
                  <Link to="#" onClick={() => setSkillOne(skill.id)}>
                    Edit
                  </Link>
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
  delSkills: id => dispatch(delSkill(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StepZero);
