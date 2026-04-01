import { applicationConfig, componentWrapperDecorator, Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from "../documentation.json";
import { spyOn } from 'storybook/test';
import {MapPostboyService} from "../src/map/services/map-postboy.service";
import {importProvidersFrom} from "@angular/core";
setCompodocJson(docJson);

export const storybookPostboy = new MapPostboyService();

/** @type { import('@storybook/angular').Preview } */
const preview = {
  async beforeEach() {
    spyOn(console, 'info')
      .mockName('')
      .mockImplementation((args) => {
        if (typeof args === 'object') action('')(args);
      });
  },
  decorators: [
    applicationConfig({
      providers: [
        { provide: MapPostboyService, useValue: storybookPostboy }
      ],
    }),
    componentWrapperDecorator(
      (story) => `<div
        style="">${story}</div>`,
    )
  ],
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  }
};

export default preview;
