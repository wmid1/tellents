import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import reactStringReplace from 'react-string-replace';
import onClickOutside from 'react-onclickoutside';
import { searchTags } from '../api';
import { setQueryTags, setTag } from '../actions/actions';
import '../styles/styles.css';

class SearchTags extends Component {
  static propTypes = {
    userReducer: PropTypes.object,
    userInfo: PropTypes.object,
    sendFirstSkill: PropTypes.func,
    selectFirstSkill: PropTypes.func,
    selectSecondSkills: PropTypes.func,
    selectTag: PropTypes.func,
    setTags: PropTypes.func,
    firstSkillId: PropTypes.number,
  };

  state = {
    value: '',
    tagListOpen: false,
    selectTags: [],
  };

  handleClickOutside = () => {
    this.setState({ tagListOpen: false });
  };

  selectTag = tag => {
    this.props.selectTag(this.props.firstSkillId, tag);
    this.setState({ selectTags: [...this.state.selectTags, tag.name] });
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
    this.setState({ tagListOpen: true });
    searchTags(event.target.value).then(response => {
      this.props.setTags(response.data.skills);
    });
  };

  render() {
    const { tags } = this.props.userInfo;
    const {
      state: { tagListOpen, selectTags },
      handleChange,
      selectTag,
    } = this;
    return (
      <div>
        <input type="text" className="form-control" placeholder="Write new skill" onChange={handleChange} />
        {tags.length !== 0 && tagListOpen && (
          <ul className="dropdown-tags">
            {tags.map(
              tag =>
                selectTags.indexOf(tag.name) === -1 && (
                  <li key={tag.id}>
                    <span className="dropdown-tag" onClick={() => selectTag(tag)}>
                      {reactStringReplace(tag.name, this.state.value, (match, i) => (
                        <b key={i}>{match}</b>
                      ))}
                    </span>
                  </li>
                ),
            )}
          </ul>
        )}
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    userReducer: store.userReducer,
    userInfo: store.userInfo,
  };
}
const mapDispatchToProps = dispatch => ({
  setTags: tags => dispatch(setQueryTags(tags)),
  selectTag: (id, tag) => dispatch(setTag(id, tag)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(onClickOutside(SearchTags));
