import { configure } from '@kadira/storybook';

function loadStories() {
  require('app/view/stories');
}

configure(loadStories, module);
