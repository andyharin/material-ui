/* eslint-env mocha */
import { shallow } from 'enzyme';
import {assert} from 'chai';
import EnhancedButton from './EnhancedButton';
import getMuiTheme from '../styles/getMuiTheme';

describe('<EnhancedButton />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});
  const testChildren = <div className="unique">Hello World</div>;

  it('renders a button', () => {
    const wrapper = shallowWithContext(
      <EnhancedButton>Button</EnhancedButton>
    );
    assert.ok(wrapper.text(), 'Button', 'should say Button');
    assert.ok(wrapper.is('button'), 'should match a button element');
    assert.strictEqual(wrapper.props().tabIndex, 0, 'should receive the focus');
  });

  it('renders a link when href is provided', () => {
    const wrapper = shallowWithContext(
      <EnhancedButton href="http://google.com">Button</EnhancedButton>
    );
    assert.ok(wrapper.text(), 'Button', 'should say Button');
    assert.ok(wrapper.is('a'), 'should match a <a> element');
  });

  it('renders any container element', () => {
    const wrapper = shallowWithContext(
      <EnhancedButton containerElement={<div />}>Button</EnhancedButton>
    );
    assert.ok(wrapper.text(), 'Button', 'should say Button');
    assert.ok(wrapper.is('div'), 'should match a div element');
  });

  it('renders children', () => {
    const wrapper = shallowWithContext(
      <EnhancedButton>{testChildren}</EnhancedButton>
    );
    assert.ok(wrapper.contains(testChildren), 'should contain the children');
  });

  it('renders a disabled button when disabled={true} which blocks onClick from firing', () => {
    const wrapper = shallowWithContext(
      <EnhancedButton disabled={true}>Button</EnhancedButton>
    );
    assert.ok(wrapper.text(), 'Button', 'should say Button');
    assert.ok(wrapper.is('button[disabled]'), 'should be a disabled button element');

    let clicked = false;
    wrapper.setProps({
      onClick: () => clicked = true,
    });
    wrapper.simulate('click');
    assert.strictEqual(clicked, false, 'should not trigger the click');
  });

  it('renders a dummy link button when disabled={true} which blocks onClick from firing', () => {
    const wrapper = shallowWithContext(
      <EnhancedButton
        disabled={true}
        href="http://google.com"
      >
        Button
      </EnhancedButton>
    );
    assert.ok(wrapper.text(), 'Button', 'should say Button');
    assert.notOk(wrapper.is('a'), 'should not be an <a> element');
    assert.notOk(wrapper.is('button'), 'should not be an <a> element');

    let clicked = false;
    wrapper.setProps({
      onClick: () => clicked = true,
    });
    wrapper.simulate('click');
    assert.strictEqual(clicked, false, 'should not trigger the click');
  });

  it('should be styleable', () => {
    const wrapper = shallowWithContext(
      <EnhancedButton style={{color: 'red'}}>Button</EnhancedButton>
    );
    assert.ok(wrapper.text(), 'Button', 'should say Button');
    assert.strictEqual(wrapper.node.props.style.color, 'red', 'should be red');
  });

  it('overrides default styles', () => {
    const wrapper = shallowWithContext(
      <EnhancedButton>Button</EnhancedButton>
    );
    assert.strictEqual(wrapper.node.props.style.background, 'none', 'should be none');
    wrapper.setProps({
      style: {
        background: 'blue',
      },
    });
    assert.strictEqual(wrapper.node.props.style.background, 'blue', 'should be blue');
  });

  it('should not have "background: none" style when passed a backgroundColor', () => {
    const wrapper = shallowWithContext(
      <EnhancedButton>Button</EnhancedButton>
    );
    assert.strictEqual(wrapper.node.props.style.background, 'none', 'should be none');
    wrapper.setProps({style: {backgroundColor: 'blue'}});
    assert.strictEqual(wrapper.node.props.style.background, undefined, 'background should be undefined');
    assert.strictEqual(wrapper.node.props.style.backgroundColor, 'blue', 'backgroundColor should be blue');
    wrapper.setProps({style: {backgroundColor: null}});
    assert.strictEqual(wrapper.node.props.style.background, 'none', 'should be none');
  });

  describe('prop: type', () => {
    it('should set a button type by default', () => {
      const wrapper = shallowWithContext(
        <EnhancedButton>Button</EnhancedButton>
      );

      assert.strictEqual(wrapper.is('button[type="button"]'), true);
    });

    it('should not set a button type on span', () => {
      const wrapper = shallowWithContext(
        <EnhancedButton containerElement="span">Button</EnhancedButton>
      );

      assert.strictEqual(wrapper.props().type, undefined);
    });

    it('should set the button type', () => {
      const wrapper = shallowWithContext(
        <EnhancedButton type="submit">Button</EnhancedButton>
      );

      assert.strictEqual(wrapper.type(), 'button', 'should say Button');
      assert.strictEqual(wrapper.is('button[type="submit"]'), true, 'should have the type attribute');
      wrapper.setProps({type: 'reset'});
      assert.strictEqual(wrapper.is('button[type="reset"]'), true, 'should have the type attribute');
    });
  });

  it('should pass through other html attributes', () => {
    const wrapper = shallowWithContext(
      <EnhancedButton name="hello">Button</EnhancedButton>
    );
    assert.ok(wrapper.is('button[name="hello"]'), 'should have the name attribute');
  });

  it('should handle focus propagation based on disabled props', () => {
    const eventStack = [];
    eventStack.reset = () => eventStack.splice(0, eventStack.length);

    const wrapper = shallowWithContext(
      <EnhancedButton
        disableKeyboardFocus={true}
        onFocus={() => eventStack.push('focus')}
      >
        Button
      </EnhancedButton>
    );

    wrapper.simulate('focus');
    assert.strictEqual(eventStack.length, 0);
    wrapper.setProps({disableKeyboardFocus: false});
    wrapper.simulate('focus');
    assert.strictEqual(eventStack.length, 1);
    wrapper.setProps({disabled: true});
    wrapper.simulate('focus');
    assert.strictEqual(eventStack.length, 1);
    wrapper.setProps({disabled: false});
    wrapper.simulate('focus');
    assert.strictEqual(eventStack.length, 2);
    wrapper.setProps({disableKeyboardFocus: true});
    wrapper.simulate('focus');
    assert.strictEqual(eventStack.length, 2);
  });

  it('have a TouchRipple and control it using props', () => {
    const wrapper = shallowWithContext(
      <EnhancedButton
        centerRipple={true}
        touchRippleColor="red"
        touchRippleOpacity={0.8}
      >
        Button
      </EnhancedButton>
    );

    const touchRipple = wrapper.find('TouchRipple');
    assert.ok(wrapper.text(), 'Button', 'should say Button');
    assert.strictEqual(touchRipple.length, 1, 'should have a TouchRipple');
    assert.strictEqual(touchRipple.node.props.centerRipple, true);
    assert.strictEqual(touchRipple.node.props.color, 'red');
    assert.strictEqual(touchRipple.node.props.opacity, 0.8);
  });

  it('has no TouchRipple when disableTouchRipple={true}', () => {
    const wrapper = shallowWithContext(
      <EnhancedButton disableTouchRipple={true}>Button</EnhancedButton>
    );
    assert.strictEqual(wrapper.find('TouchRipple').length, 0, 'should not have a TouchRipple');
  });

  it('have a FocusRipple when keyboard focused (tracked internally) and control it using props', () => {
    const wrapper = shallowWithContext(
      <EnhancedButton
        focusRippleColor="red"
        focusRippleOpacity={0.8}
      >
        Button
      </EnhancedButton>
    );

    assert.strictEqual(wrapper.find('FocusRipple').length, 0, 'should not have a FocusRipple');

    wrapper.setState({
      isKeyboardFocused: true,
    });

    const focusRipple = wrapper.find('FocusRipple');
    assert.ok(wrapper.text(), 'Button', 'should say Button');
    assert.strictEqual(focusRipple.length, 1, 'should have a FocusRipple');
    assert.strictEqual(focusRipple.node.props.show, true);
    assert.strictEqual(focusRipple.node.props.color, 'red');
    assert.strictEqual(focusRipple.node.props.opacity, 0.8);

    wrapper.setProps({
      disableKeyboardFocus: true,
    });
    wrapper.setState({
      isKeyboardFocused: true,
    });

    assert.strictEqual(wrapper.find('FocusRipple').length, 0, 'should not have a FocusRipple');

    wrapper.setProps({
      disableKeyboardFocus: false,
    });
    wrapper.setState({
      isKeyboardFocused: true,
    });

    assert.strictEqual(wrapper.find('FocusRipple').length, 1, 'should have a FocusRipple');
  });

  it('should remove a FocusRipple on blur', () => {
    const wrapper = shallowWithContext(
      <EnhancedButton>Button</EnhancedButton>
    );
    wrapper.setState({
      isKeyboardFocused: true,
    });
    assert.strictEqual(wrapper.find('FocusRipple').length, 1, 'should have a FocusRipple');
    wrapper.simulate('blur');
    assert.strictEqual(wrapper.find('FocusRipple').length, 0, 'should not have a FocusRipple');
  });

  describe('prop: disabled', () => {
    it('should have no ripples when button is disabled', () => {
      const wrapper = shallowWithContext(
        <EnhancedButton keyboardFocused={true} disabled={true}>Button</EnhancedButton>
      );
      assert.strictEqual(wrapper.find('TouchRipple').length, 0, 'should not have a TouchRipple');
      assert.strictEqual(wrapper.find('FocusRipple').length, 0, 'should not have a FocusRipple');
      assert.strictEqual(wrapper.props().tabIndex, -1, 'should not receive the focus');
    });
  });

  it('should have no ripples when both are disabled', () => {
    const wrapper = shallowWithContext(
      <EnhancedButton
        keyboardFocused={true}
        disableFocusRipple={true}
        disableTouchRipple={true}
      >
        Button
      </EnhancedButton>
    );
    assert.strictEqual(wrapper.find('TouchRipple').length, 0, 'should not have a TouchRipple');
    assert.strictEqual(wrapper.find('FocusRipple').length, 0, 'should not have a FocusRipple');
  });

  it('should fire the click handler if keyboard focused and the enter or space keys are hit', () => {
    const eventStack = [];
    eventStack.reset = () => eventStack.splice(0, eventStack.length);

    const wrapper = shallowWithContext(
      <EnhancedButton
        keyboardFocused={true}
        onClick={() => eventStack.push('click')}
      >
        Button
      </EnhancedButton>
    );

    wrapper.simulate('keyDown', {which: 13});
    assert.strictEqual(eventStack.length, 1);

    wrapper.setState({isKeyboardFocused: true});
    wrapper.simulate('keyUp', {which: 32});
    assert.strictEqual(eventStack.length, 2);

    wrapper.setState({isKeyboardFocused: true});
    wrapper.setProps({disabled: true});
    wrapper.simulate('keyDown', {which: 13});
    assert.strictEqual(eventStack.length, 2, 'should not work when button is disabled');
  });
});
