import { cleanup, render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import TopBar from './TopBar';

afterEach(cleanup);
describe('topbar tests', () => {
  render(<TopBar />);
  it('loads the topbar', () => {
    const topBarElem = screen.getByTestId('top-bar');

    expect(topBarElem).toBeInTheDocument();
  });
  it('loads the logo', () => {
    const globeText = screen.getByText('Globe');
    const stackText = screen.getByText('Stack');

    expect(globeText).toBeInTheDocument();
    expect(stackText).toBeInTheDocument();
  });
});
