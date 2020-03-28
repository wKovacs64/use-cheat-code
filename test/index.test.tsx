import * as React from 'react';
import MutationObserver from '@sheerun/mutationobserver-shim';
import '@testing-library/jest-dom';
import { render, screen, act } from '@testing-library/react';
import user from '@testing-library/user-event';
import { useCheatCode } from '../src';

// required for @testing-library/dom v7 until tsdx upgrades to Jest 25+
window.MutationObserver = MutationObserver;

const TestComponent: React.FC<{ cheatCodeKeys: Array<string> }> = ({
  cheatCodeKeys,
}) => {
  const cheatCodeActivated = useCheatCode(cheatCodeKeys);
  return (
    <React.Fragment>
      <span data-testid="activated">{String(cheatCodeActivated)}</span>
      <input data-testid="input" type="text" />
    </React.Fragment>
  );
};

describe('useCheatCode', () => {
  it('toggles cheat when cheat code is entered', async () => {
    const cheatCode = 'iddqd';
    const cheatCodeKeys = ['i', 'd', 'd', 'q', 'd'];
    render(<TestComponent cheatCodeKeys={cheatCodeKeys} />);
    const activated = screen.getByTestId('activated');
    const input = screen.getByTestId('input');

    expect(activated).toHaveTextContent('false');

    await act(async () => {
      await user.type(input, cheatCode);
    });

    expect(activated).toHaveTextContent('true');

    await act(async () => {
      await user.type(input, cheatCode);
    });

    expect(activated).toHaveTextContent('false');
  });
});
