import React from 'react';
import '../App.css';  // DELETE

const sum = (arr) => arr.reduce((a, b) => a + b);

class ResizablePanelsContainer extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.ref = React.createRef();
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.numPanels = 3;
    this.state = {
      dragging: false,
      contentWidth: null,
      panelWidths: [200, 200, 300],
      selectedDividerIndex: null,
      selectedDividerX: null,
    }
  }

  componentDidMount() {
    const contentWidth = this.ref.current.offsetWidth;
    this.setState({
      contentWidth: contentWidth,
      panelWidths: [200, 400, contentWidth - (200 + 400)],
    });
  }

  onMouseDown(index, e) {
    this.setState({
      dragging: true,
      selectedDividerIndex: index,
      selectedDividerX: e.clientX,
    })
  }

  onMouseUp(e) {
    this.setState({
      dragging: false,
    });
  }

  expandRight(widths, index, delta) {
    delta = Math.min(delta, sum(widths.slice(index + 1)));
    widths[index] += delta;
    let shrinkAmount = -delta;
    for (let i = index + 1; i < this.numPanels; ++i) {
      widths[i] += shrinkAmount;
      if (widths[i] > 0) {
        break;
      } else {
        shrinkAmount = widths[i];
        widths[i] = 0;
      }
    }
    return widths;
  }

  expandLeft(widths, index, delta) {
    delta = Math.min(delta, sum(widths.slice(0, index + 1)));
    widths[index + 1] += delta;
    let shrinkAmount = -delta;
    for (let i = index; i >= 0; --i) {
      widths[i] += shrinkAmount;
      if (widths[i] > 0) {
        break;
      } else {
        shrinkAmount = widths[i];
        widths[i] = 0;
      }
    }
    return widths;
  }

  onMouseMove(e) {
    if (!this.state.dragging) return;
    const index = this.state.selectedDividerIndex;
    const didExpandRight = e.clientX > this.state.selectedDividerX;
    let widths = this.state.panelWidths;
    let maxWidth = this.state.contentWidth;
    let delta = Math.abs(e.clientX - this.state.selectedDividerX);

    if (didExpandRight) {
      widths = this.expandRight(widths, index, delta);
    } else {
      widths = this.expandLeft(widths, index, delta);
    }
    const minWidth = 1;
    this.setState({
      selectedDividerX: e.clientX,
      panelWidths: widths,
    });
  }

  render() {
    const childContainerStyle = {
      display: 'inlineBlock',
      height: '100%',
    }

    let panels = [];
    for (let i = 0; i < this.props.children.length; ++i) {
      const c = this.props.children[i];
      const s = {
        display: 'inline-block',
        height: '100%',
        width: this.state.panelWidths[i],
      };
      const f = (e) => {this.onMouseDown(i, e)}
      panels.push(<div style={s}>{c}</div>);
      panels.push(<div className='divider' onMouseDown={f} />);
    }
    panels.pop();

    return (
      <div ref={this.ref} style={{height: '100%', width: '100%'}}
          onMouseMove={this.onMouseMove}
          onMouseUp={this.onMouseUp}
          onMouseLeave={this.onMouseLeave}>
          {panels}
      </div>
    );
  }

}

export default ResizablePanelsContainer;
