import { connect } from 'react-redux';
import { compose } from 'recompose';
import Topics from './Topics';

const mapStateToProps = state => ({
  items: state.topics.items,
});

const mapDispatchToProps = {
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(Topics);
