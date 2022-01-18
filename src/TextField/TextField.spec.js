/* eslint-env mocha */
import { Component } from 'react';
import PropTypes from 'prop-types';
import {shallow, mount} from 'enzyme';
import {assert} from 'chai';
import TextField from './TextField';
import TextFieldHint from './TextFieldHint';
import TextFieldLabel from './TextFieldLabel';
import getMuiTheme from '../styles/getMuiTheme';

describe('<TextField />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});
  const mountWithContext = (node) => mount(node, {
    context: {muiTheme},
    childContextTypes: {muiTheme: PropTypes.object},
  });

  it('passes event and value to the onChange callback', (done) => {
    const wrapper = shallowWithContext(
      <TextField
        onChange={(event, value) => {
          assert.strictEqual(event.target.value, 'woof');
          assert.strictEqual(value, 'woof', 'should pass the value as the 2nd arg');
          done();
        }}
        id="unique"
      />
    );

    wrapper.find('input').simulate('change', {target: {value: 'woof'}});
  });

  it('shrinks TextFieldLabel when defaultValue', () => {
    const wrapper = shallowWithContext(
      <TextField
        floatingLabelText="floating label text"
        defaultValue="default value"
      />
    );

    assert.strictEqual(wrapper.find(TextFieldLabel).props().shrink, true, 'should shrink TextFieldLabel');
    wrapper.update();
    assert.strictEqual(wrapper.find(TextFieldLabel).props().shrink, true, 'should shrink TextFieldLabel');
  });

  describe('prop: children', () => {
    it('should forward any property to the root', () => {
      const wrapper = shallowWithContext(
        <TextField data-test="hello" id="unique">
          <div />
        </TextField>
      );

      assert.strictEqual(
        wrapper.is('[data-test="hello"]'), true,
        'The root element should receive any additional properties'
      );
    });
  });

  describe('isValid', () => {
    it('should consider the input as empty', () => {
      const values = [
        undefined,
        null,
        '',
      ];

      values.forEach((value) => {
        const wrapper = shallowWithContext(
          <TextField value={value} id="unique" />
        );

        assert.strictEqual(wrapper.state().hasValue, false,
          `Should consider '${value}' as empty`);
      });
    });

    it('should consider the input as not empty', () => {
      const values = [
        ' ',
        0,
        false,
      ];

      values.forEach((value) => {
        const wrapper = shallowWithContext(
          <TextField value={value} id="unique" />
        );

        assert.strictEqual(wrapper.state().hasValue, true,
          `Should consider '${value}' as not empty`);
      });
    });
  });

  describe('<TextFieldHint>', () => {
    it('should be hidden when the component is rerender with the same props', () => {
      class MyComponent1 extends Component {
        state = {
          value: '',
        };

        handleChange = () => {
          this.setState({value: ''});
        };

        render() {
          return (
            <TextField
              id="foo"
              value={this.state.value}
              hintText="bar"
              onChange={this.handleChange}
            />
          );
        }
      }

      const wrapper = mountWithContext(<MyComponent1 />);
      const input = wrapper.find('input');
      input.simulate('change', {target: {value: 'a'}});
      assert.strictEqual(wrapper.find(TextFieldHint).props().show, true,
        'The hint text should keep the same state');
    });
  });

  describe('prop: floatingLabelFocusStyle', () => {
    it('should be applied when the input is focused', () => {
      const wrapper = shallowWithContext(
        <TextField
          floatingLabelText="Name"
          floatingLabelFixed={true}
          floatingLabelFocusStyle={{color: 'blue'}}
          floatingLabelStyle={{color: 'red'}}
        />
      );
      wrapper.setState({
        isFocused: true,
      });
      assert.strictEqual(wrapper.find(TextFieldLabel).props().style.color, 'blue');
    });
  });

  describe('prop: floatingLabelFocusStyle', () => {
    it('should be applied', () => {
      const wrapper = shallowWithContext(
        <TextField
          floatingLabelText="Name"
          floatingLabelShrinkStyle={{transform: 'none'}}
        />
      );
      assert.strictEqual(wrapper.find(TextFieldLabel).props().shrinkStyle.transform, 'none');
    });
  });

  describe('prop: errorStyle', () => {
    it('should override the errorText', () => {
      const wrapper = shallowWithContext(
        <TextField
          id="foo"
          floatingLabelText="password"
          errorStyle={{
            color: 'red',
            bottom: 10,
          }}
          errorText="error message"
        />
      );

      const errorWrapper = wrapper.children().last();
      assert.strictEqual(errorWrapper.props().style.bottom, 10, 'Users should have the higher priority');
    });
  });

  describe('state: hasValue', () => {
    describe('of uncontrolled component', () => {
      it('should change depending on the input', () => {
        const wrapper = shallowWithContext(
          <TextField id="unique" />
        );
        const input = wrapper.find('input');
        assert.strictEqual(wrapper.state().hasValue, false);
        input.simulate('change', {target: {value: 'a'}});
        assert.strictEqual(wrapper.state().hasValue, true);
        input.simulate('change', {target: {value: ''}});
        assert.strictEqual(wrapper.state().hasValue, false);
      });
    });

    describe('of controlled component', () => {
      it('should be false if onChange does nothing despite the input', () => {
        const wrapper = shallowWithContext(
          <TextField value="" id="unique" />
        );
        wrapper.find('input').simulate('change', {target: {value: 'a'}});
        assert.strictEqual(wrapper.state().hasValue, false, 'because props.value is still invalid.');
      });

      it('should be true if and only if props.value is set', () => {
        const wrapper = shallowWithContext(
          <TextField value="" id="unique" />
        );
        assert.strictEqual(wrapper.state().hasValue, false);
        wrapper.setProps({value: 'a'});
        assert.strictEqual(wrapper.state().hasValue, true, 'it is consistent with props.value');
      });
    });
  });
});
