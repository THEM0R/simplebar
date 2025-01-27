import React from 'react';
import Select from 'react-select';
import { FixedSizeList as List } from 'react-window';
import SimpleBarReact from 'simplebar-react';
import SimpleBar from 'simplebar';

import Playground from 'simplebar/demo/Playground';

import 'simplebar/src/simplebar.css';

import './browser/css/demo.css';

if (typeof Promise === 'undefined') {
  // Rejection tracking prevents a common issue where React gets into an
  // inconsistent state due to an error, but it gets swallowed by a Promise,
  // and the user has no idea what causes React's erratic future behavior.
  require('promise/lib/rejection-tracking').enable();
  window.Promise = require('promise/lib/es6-extensions.js');
}

const renderScrollbar = props => {
  return (
    <SimpleBarReact style={{ maxHeight: 300 }}>{props.children}</SimpleBarReact>
  );
};

class Demo extends React.Component {
  scrollableElRef = React.createRef();

  componentDidMount() {
    new SimpleBar(document.getElementById('manual-instantiation'));
    new SimpleBar(document.getElementById('with-classnames'), {
      classNames: { vertical: 'my-custom-class' }
    });

    for (let scrollArea of document.getElementsByClassName('demo-nested')) {
      new SimpleBar(scrollArea, {
        autoHide: false
      });
    }

    const perfEls = document.querySelectorAll('.demo-perf');
    const start = performance.now();

    Array.prototype.forEach.call(perfEls, (el, i) => {
      new SimpleBar(el);

      if (i + 1 === perfEls.length) {
        console.log(performance.now() - start);
      }
    });

    // this.scrollableElRef.current.addEventListener('scroll', e =>
    //   console.log(e)
    // );
  }

  render() {
    return (
      <section>
        <h1>Simplebar demo page</h1>
        <section>
          <div className="col">
            <h2>Default</h2>
            <div id="demo1" className="demo1" data-simplebar>
              <h3 className="sticky">Sticky header</h3>
              {[...Array(50)].map((x, i) => (
                <p key={i} className="odd">
                  Some content Some content Some content Some content Some
                  content Some content
                  <button>click</button>
                </p>
              ))}
            </div>
          </div>
          <div className="col">
            <h2>autoHide false</h2>
            <div
              id="demo2"
              className="demo1"
              data-simplebar
              data-simplebar-auto-hide="false"
            >
              {[...Array(10)].map((x, i) => (
                <p key={i} className="odd">
                  Some content
                </p>
              ))}
            </div>
          </div>
        </section>
        <section>
          <div className="col">
            <h2>forceVisible true</h2>
            <div
              id="demo3"
              className="demo1"
              data-simplebar
              data-simplebar-force-visible
            >
              {[...Array(5)].map((x, i) => (
                <p key={i} className="odd">
                  Some content
                </p>
              ))}
            </div>
          </div>
          <div className="col">
            <h2>direction RTL</h2>
            <div
              className={'demo4 demo-rtl'}
              style={{ width: '200px', direction: 'rtl' }}
              data-simplebar
              data-simplebar-direction="rtl"
            >
              <div className="box">1</div>
              <div className="box">2</div>
              <div className="box">3</div>
              <div className="box">4</div>
              <div className="box">5</div>
            </div>
          </div>
        </section>
        <section>
          <div className="col">
            <h2>React-Select</h2>
            <Select
              components={{ MenuList: renderScrollbar }}
              options={[...Array(50)].map((x, i) => ({
                value: i,
                label: i
              }))}
            />
          </div>
          <div className="col">
            <h2>Horizontal</h2>
            <Playground width height direction>
              {({ height, width, direction }) => (
                <div style={{ width: '200px', height: '200px' }}>
                  <div
                    data-simplebar
                    className="demo4"
                    style={{ height, width, direction }}
                  >
                    <div className="box">1</div>
                    <div className="box">2</div>
                    <div className="box">3</div>
                    <div className="box">4</div>
                    <div className="box">5</div>
                  </div>
                </div>
              )}
            </Playground>
          </div>
        </section>
        <section>
          <div className="col">
            <h2>Manual instantiation</h2>
            <div
              id="manual-instantiation"
              className="demo4"
              style={{ width: '200px' }}
            >
              <div className="box">1</div>
              <div className="box">2</div>
              <div className="box">3</div>
              <div className="box">4</div>
              <div className="box">5</div>
            </div>
          </div>
          <div className="col">
            <h2>Horizontal native</h2>
            <div className="demo4" style={{ width: '200px' }}>
              <div className="box">1</div>
              <div className="box">2</div>
              <div className="box">3</div>
              <div className="box">4</div>
              <div className="box">5</div>
            </div>
          </div>
        </section>
        <section>
          <div className="col">
            <h2>Both axis</h2>
            <div className="demo-both-axis" data-simplebar>
              <div className="box">1</div>
            </div>
          </div>
          <div className="col">
            <h2>Both axis + padding</h2>
            <div
              className="demo-both-axis demo-both-axis--padding"
              data-simplebar
            >
              <div className="box">1</div>
            </div>
          </div>
        </section>
        <section>
          <div className="col">
            <h2>Both axis + padding native</h2>
            <div className="demo-both-axis demo-both-axis--padding">
              <div className="box">1</div>
            </div>
          </div>
          <div className="col">
            <h2>Y axis only</h2>
            <div className="demo-y-axis" data-simplebar>
              <div className="box">1</div>
            </div>
          </div>
        </section>
        <section>
          <div className="col">
            <h2>With custom classnames</h2>
            <div
              id="with-classnames"
              className="demo4"
              style={{ width: '200px' }}
            >
              <div className="box">1</div>
              <div className="box">2</div>
              <div className="box">3</div>
              <div className="box">4</div>
              <div className="box">5</div>
            </div>
          </div>
          <div className="col">
            <h2>Nested</h2>
            <div className="demo-nested demo1">
              <div className="demo-nested demo1" style={{ height: '200px' }}>
                {[...Array(50)].map((x, i) => (
                  <p key={i} className="odd">
                    Some content
                  </p>
                ))}
              </div>
              {[...Array(50)].map((x, i) => (
                <p key={i} className="odd">
                  Some content
                </p>
              ))}
            </div>
          </div>
        </section>
        <section>
          <h2>Flex layout</h2>
          <Playground width>
            {({ width }) => (
              <div className="demo-flex">
                <div className="left" data-simplebar>
                  <div className="content" />
                </div>
                <div className="center" data-simplebar>
                  <div className="content" />
                </div>
                <div className="right" data-simplebar style={{ width }}>
                  <div className="content" />
                </div>
              </div>
            )}
          </Playground>
        </section>
        <section>
          <div className="col">
            <h2>forceVisible true</h2>
            <div className="demo-height-auto" data-simplebar>
              <div className="inner">
                {[...Array(5)].map((x, i) => (
                  <p key={i} className="odd">
                    Some content
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="col">
            <h2>SimpleBar-React + React-Window</h2>
            <SimpleBarReact
              className="demo1"
              autoHide={false}
              data-simplebar-force-visible="x"
              scrollableNodeProps={{ ref: this.scrollableElRef }}
            >
              {({ scrollableNodeRef, contentNodeRef }) => (
                <List
                  height={300}
                  itemCount={1000}
                  itemSize={35}
                  outerRef={scrollableNodeRef}
                  innerRef={contentNodeRef}
                  className="simplebar-content-wrapper"
                >
                  {({ index, style }) => <div style={style}>Row {index}</div>}
                </List>
              )}
            </SimpleBarReact>
          </div>
        </section>
        <section>
          <div className="col">
            <h2>Performance test</h2>
            {[...Array(10)].map((x, i) => (
              <div key={i} className="demo-perf">
                {[...Array(5)].map((x, i) => (
                  <p key={i} className="odd">
                    Some content
                  </p>
                ))}
              </div>
            ))}
          </div>
        </section>
      </section>
    );
  }
}

export default Demo;
