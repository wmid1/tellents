import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../../styles/styles.css';

class StepOne extends Component {
  static propTypes = {
    userInfo: PropTypes.object,
    setSkillOne: PropTypes.func,
    choiceFirstSkill: PropTypes.func,
    firstSkillId: PropTypes.number,
  };

  render() {
    const { professionCategories } = this.props.userInfo;
    const {
      props: { choiceFirstSkill, firstSkillId, setSkillOne },
    } = this;
    return (
      <div>
        <div className="step-one justify-space-between">
          <div className="skill-block skill-cat">
            <div className="skill-block-title">Choose Your Skill Category</div>
            <div className="skill-block-list">
              <form>
                {professionCategories.map(skill => (
                  <div className="checkbox-block" key={skill.id} onClick={() => choiceFirstSkill(skill.id)}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      id={skill.id}
                      value={skill.name}
                      defaultChecked={firstSkillId !== '' && true}
                    />
                    <label htmlFor={skill.id}>
                      <span className="checkbox-circle">
                        <span className="icon icon-check-mark" />
                      </span>
                      <span className="checkbox-text"> {skill.name} </span>
                    </label>
                  </div>
                ))}
              </form>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-blue btn-bold btn-next step-2-toggler step-toggler"
          disabled={firstSkillId === ''}
          onClick={setSkillOne}
        >
          Next
        </button>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    userInfo: store.userInfo,
  };
}

export default connect(mapStateToProps)(StepOne);
