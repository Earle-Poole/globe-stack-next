import { cleanup, render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import TopBar from './TopBar';

afterEach(cleanup);
describe('topbar tests', () => {
  it('loads the topbar', () => {
    render(<TopBar />);

    const topBarElem = screen.getByTestId('top-bar');

    expect(topBarElem).toBeInTheDocument();
  });
  it('loads the logo', () => {
    render(<TopBar />);

    const globeText = screen.getByText('Globe');
    const stackText = screen.getByText('Stack');

    expect(globeText).toBeInTheDocument();
    expect(stackText).toBeInTheDocument();
  });
});
