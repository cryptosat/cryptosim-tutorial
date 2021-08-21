import React from 'react';
import '../App.css';  // DELETE

const sum = (arr) => arr.reduce((a, b) => a + b);

const cumsum = ((arr) => {
  let result = [arr[0]]
  for (let i = 1; i < arr.length; ++i) {
    result[i] = result[i - 1] + arr[i];
  }
  return result;
});

class PanelContainer extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.ref = React.createRef();
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onResize = this.onResize.bind(this);
    this.state = {
      dragging: false,
      contentWidth: null,
      panelWidths: new Array(this.props.children.length).fill(0),
      selectedDividerIndex: null,
      selectedDividerX: null,
      initializedWidths: false,
    }
    window.addEventListener('resize', this.onResize);
  }

  pauseEvent(e) {
    if(e.stopPropagation) e.stopPropagation();
    if(e.preventDefault) e.preventDefault();
    e.cancelBubble=true;
    e.returnValue=false;
    return false;
  }

  onResize() {
    if (this.ref.current == null) return;
    const uniform = 1. / this.props.children.length;
    let ratios;
    if (!this.state.initializedWidths) {
      ratios = new Array(this.props.children.length).fill(uniform);
    } else {
      ratios = this.state.panelWidths.map((w) => w / this.state.contentWidth);
    }
    const contentWidth = this.ref.current.offsetWidth;
    const panelWidths = ratios.map((r) => contentWidth * r);
    this.setState({
      contentWidth: contentWidth,
      panelWidths: panelWidths,
      initializedWidths: true,
    });
  }

  componentDidMount() {
    this.onResize();
  }

  onMouseDown(index, e) {
    this.setState({
      dragging: true,
      selectedDividerIndex: index,
      selectedDividerX: e.clientX,
    });
    this.pauseEvent(e);
  }

  onMouseUp(e) {
    this.setState({
      dragging: false,
    });
    this.pauseEvent(e);
  }

  expandRight(widths, index, delta) {
    delta = Math.min(delta, sum(widths.slice(index + 1)));
    widths[index] += delta;
    let shrinkAmount = -delta;
    for (let i = index + 1; i < this.props.children.length; ++i) {
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
    let delta = Math.abs(e.clientX - this.state.selectedDividerX);

    if (didExpandRight) {
      widths = this.expandRight(widths, index, delta);
    } else {
      widths = this.expandLeft(widths, index, delta);
    }
    this.setState({
      selectedDividerX: e.clientX,
      panelWidths: widths,
    });
    this.pauseEvent(e);
  }

  render() {
    let panels = [];
    const lefts = cumsum([0, ...this.state.panelWidths]);
    for (let i = 0; i < this.props.children.length; ++i) {
      const panel = this.props.children[i];
      const panelStyle = {
        display: 'inline-block',
        position: 'absolute',
        height: '100%',
        wordWrap: 'break-word',
        left: lefts[i],
        width: this.state.panelWidths[i],
      };
      const dividerWidth = 4;
      const dividerStyle = {
        display: 'inline-block',
        position: 'absolute',
        left: lefts[i + 1] - dividerWidth,
        width: dividerWidth,
      }
      const f = (e) => {this.onMouseDown(i, e)}
      panels.push(<div className='panel' key={'panels-' + i} style={panelStyle}>{panel}</div>);
      panels.push(<div className='divider' key={'divider-' + i} style={dividerStyle} onMouseDown={f} />);
    }
    panels.pop();

    return (
      <div ref={this.ref} className='panel-container' style={{height: '100%', width: '100%'}}
          onMouseMove={this.onMouseMove}
          onMouseUp={this.onMouseUp}
          onMouseLeave={this.onMouseLeave}>
          {panels}
      </div>
    );
  }

}

export default PanelContainer;
