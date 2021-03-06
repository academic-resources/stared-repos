import { attr } from '@microsoft/fast-element';
import {
  NumberField as FoundationNumberField,
  NumberFieldOptions,
  numberFieldTemplate as template,
} from '@microsoft/fast-foundation';
import { numberFieldStyles as styles } from './number-field.styles';

/**
 * Number field appearances
 * @public
 */
export type NumberFieldAppearance = 'filled' | 'outline';

/**
 * The Fluent number field class
 * @internal
 */
export class NumberField extends FoundationNumberField {
  /**
   * The appearance of the element.
   *
   * @public
   * @remarks
   * HTML Attribute: appearance
   */
  @attr
  public appearance: NumberFieldAppearance;

  /**
   * @internal
   */
  public connectedCallback() {
    super.connectedCallback();

    if (!this.appearance) {
      this.appearance = 'outline';
    }
  }
}

/**
 * Styles for NumberField
 * @public
 */
export const numberFieldStyles = styles;

/**
 * The Fluent Number Field Custom Element. Implements {@link @microsoft/fast-foundation#NumberField},
 * {@link @microsoft/fast-foundation#numberFieldTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-number-field\>
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus | delegatesFocus}
 */
export const fluentNumberField = NumberField.compose<NumberFieldOptions>({
  baseName: 'number-field',
  baseClass: FoundationNumberField,
  styles,
  template,
  shadowOptions: {
    delegatesFocus: true,
  },
  stepDownGlyph: `
    <span class="step-down-glyph" part="step-down-glyph"></span>
  `,
  stepUpGlyph: `
    <span class="step-up-glyph" part="step-up-glyph"></span>
  `,
});
