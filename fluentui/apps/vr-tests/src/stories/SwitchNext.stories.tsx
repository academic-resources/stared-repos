import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FluentProviderDecorator } from '../utilities/index';
import { Switch } from '@fluentui/react-switch';

storiesOf('SwitchNext', module)
  .addDecorator(FluentProviderDecorator)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.test-class')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('.test-class')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .mouseUp('.test-class')
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Root (unchecked)', () => <Switch className="test-class" defaultChecked={false} />, {
    rtl: true,
  })
  .addStory('Root (checked)', () => <Switch className="test-class" defaultChecked={true} />, {
    rtl: true,
  })
  .addStory('Disabled (unchecked)', () => (
    <Switch className="test-class" disabled defaultChecked={false} />
  ))
  .addStory('Disabled (checked)', () => (
    <Switch className="test-class" disabled defaultChecked={true} />
  ));
