window.URL.createObjectURL = jest.fn();
import * as fs from 'fs';
import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';

import {Polygon, Point} from 'ol/geom';
import {Pixel} from 'ol/pixel';
import {RFeature, RLayerVector, RMap, RContext} from 'rlayers';
import * as common from './common';

describe('<RFeature>', () => {
    it('should create features', async () => {
        const mapEvents = ['Click', 'PointerDrag', 'PointerMove'];
        const featureEvents = ['Change'];
        const handler = jest.fn();
        const handlers = mapEvents
            .concat(featureEvents)
            .reduce((ac, a) => ({...ac, ['on' + a]: handler}), {});
        const map = React.createRef() as React.RefObject<RMap>;
        const ref = [
            React.createRef() as React.RefObject<RFeature>,
            React.createRef() as React.RefObject<RFeature>
        ];
        const {container, unmount} = render(
            <RMap ref={map} {...common.mapProps}>
                <RLayerVector zIndex={10}>
                    <RFeature
                        ref={ref[0]}
                        {...handlers}
                        style={common.styles.blueDot}
                        geometry={new Point(common.coords.ArcDeTriomphe)}
                    >
                        <RContext.Consumer>
                            {(c) => <div>marker {JSON.stringify(c, common.safeStringify)}</div>}
                        </RContext.Consumer>
                    </RFeature>
                    <RFeature
                        ref={ref[1]}
                        {...handlers}
                        style={common.styles.yellow}
                        geometry={
                            new Polygon([
                                [
                                    common.coords.PlaceDItalie,
                                    common.coords.Bastille,
                                    common.coords.TourEiffel,
                                    common.coords.PlaceDItalie
                                ]
                            ])
                        }
                    >
                        <RContext.Consumer>
                            {(c) => <div>marker {JSON.stringify(c, common.safeStringify)}</div>}
                        </RContext.Consumer>
                    </RFeature>
                </RLayerVector>
            </RMap>
        );
        for (const evname of mapEvents)
            for (const r of ref)
                r.current.ol.dispatchEvent(
                    common.createEvent(evname.toLowerCase(), map.current.ol)
                );
        for (const evname of featureEvents)
            for (const r of ref)
                r.current.ol.dispatchEvent(
                    common.createEvent(evname.toLowerCase(), map.current.ol)
                );
        expect(container.innerHTML).toMatchSnapshot();
        // +1 because there is one implicit change at creation
        expect(handler).toHaveBeenCalledTimes((mapEvents.length + featureEvents.length + 1) * 2);
        unmount();
    });

    it('should support updating feature props', async () => {
        const {container, rerender} = render(
            <RMap {...common.mapProps}>
                <RLayerVector>
                    <RFeature
                        properties={{name: 'Arc de Triomphe'}}
                        geometry={new Point(common.coords.ArcDeTriomphe)}
                    >
                        <RContext.Consumer>
                            {(c) => <div>marker {JSON.stringify(c, common.safeStringify)}</div>}
                        </RContext.Consumer>
                    </RFeature>
                </RLayerVector>
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
        rerender(
            <RMap {...common.mapProps}>
                <RLayerVector>
                    <RFeature
                        properties={{name: "Place d'Italie"}}
                        geometry={new Point(common.coords.PlaceDItalie)}
                    >
                        <RContext.Consumer>
                            {(c) => <div>marker {JSON.stringify(c, common.safeStringify)}</div>}
                        </RContext.Consumer>
                    </RFeature>
                </RLayerVector>
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
    });

    it('should relay map events to features', () => {
        const map = React.createRef() as React.RefObject<RMap>;
        const ref = [
            React.createRef() as React.RefObject<RFeature>,
            React.createRef() as React.RefObject<RFeature>
        ];
        const mapEvents = ['Click', 'SingleClick', 'DblClick', 'PointerDrag', 'PointerMove'];
        const handlers = [
            jest.fn(common.handlerCheckContext(RFeature, ['map'], [map])),
            jest.fn(common.handlerCheckContext(RFeature, ['map'], [map]))
        ];
        const handlerProps = [
            mapEvents.reduce((ac, a) => ({...ac, ['on' + a]: handlers[0]}), {}),
            mapEvents.reduce((ac, a) => ({...ac, ['on' + a]: handlers[1]}), {})
        ];
        const {container} = render(
            <RMap ref={map} {...common.mapProps}>
                <RLayerVector>
                    <RFeature
                        ref={ref[0]}
                        properties={{name: 'Arc de Triomphe'}}
                        {...handlerProps[0]}
                        geometry={new Point(common.coords.ArcDeTriomphe)}
                    />
                    <RFeature
                        ref={ref[1]}
                        properties={{name: "Place d'Italie"}}
                        {...handlerProps[1]}
                        geometry={new Point(common.coords.PlaceDItalie)}
                    />
                </RLayerVector>
            </RMap>
        );
        map.current.ol.forEachFeatureAtPixel = jest.fn((pixel: Pixel, cb) => {
            if (pixel[0] === 10) return cb.call(this, ref[0].current.ol, null);
            if (pixel[0] === 20) return cb.call(this, ref[1].current.ol, null);
            throw new Error('unexpected');
        });
        for (const ev of mapEvents) {
            map.current.ol.dispatchEvent(common.createEvent(ev, map.current.ol, 10));
            map.current.ol.dispatchEvent(common.createEvent(ev, map.current.ol, 20));
        }
        expect(handlers[0]).toHaveBeenCalledTimes(mapEvents.length);
        expect(handlers[1]).toHaveBeenCalledTimes(mapEvents.length);
    });

    it('should generate pointerenter, pointerleave and pointerdragend', () => {
        const map = React.createRef() as React.RefObject<RMap>;
        const ref = [0, 1, 2].map(() => React.createRef() as React.RefObject<RFeature>);
        const mapEvents = ['PointerEnter', 'PointerLeave', 'PointerDragEnd'];
        const handlerProps = mapEvents.reduce(
            (ac, a) => ({
                ...ac,
                ['on' + a]: jest.fn(common.handlerCheckContext(RFeature, ['map'], [map]))
            }),
            {}
        );
        const {container} = render(
            <RMap ref={map} {...common.mapProps}>
                <RLayerVector>
                    <RFeature
                        ref={ref[0]}
                        properties={{name: 'Arc de Triomphe'}}
                        {...handlerProps}
                        geometry={new Point(common.coords.ArcDeTriomphe)}
                    />
                    <RFeature
                        ref={ref[1]}
                        properties={{name: "Place d'Italie"}}
                        geometry={new Point(common.coords.PlaceDItalie)}
                    />
                    <RFeature
                        ref={ref[2]}
                        properties={{name: "Arc de Triomphe' shadow"}}
                        {...handlerProps}
                        geometry={new Point(common.coords.ArcDeTriomphe)}
                    />
                </RLayerVector>
            </RMap>
        );
        map.current.ol.forEachFeatureAtPixel = jest.fn((pixel: Pixel, cb) => {
            if (pixel[0] === 10) {
                if (cb.call(this, ref[0].current.ol, null)) return;
                return cb.call(this, ref[2].current.ol, null);
            }
            if (pixel[0] === 20) return cb.call(this, ref[1].current.ol, null);
            return undefined;
        });

        map.current.ol.dispatchEvent(common.createEvent('pointermove', map.current.ol, 0));
        expect(handlerProps['onPointerEnter']).toHaveBeenCalledTimes(0);
        map.current.ol.dispatchEvent(common.createEvent('pointermove', map.current.ol, 10));
        expect(handlerProps['onPointerEnter']).toHaveBeenCalledTimes(2);
        expect(handlerProps['onPointerLeave']).toHaveBeenCalledTimes(0);
        map.current.ol.dispatchEvent(common.createEvent('pointermove', map.current.ol, 20));
        expect(handlerProps['onPointerEnter']).toHaveBeenCalledTimes(2);
        expect(handlerProps['onPointerLeave']).toHaveBeenCalledTimes(2);

        map.current.ol.dispatchEvent(common.createEvent('pointermove', map.current.ol, 0));
        map.current.ol.dispatchEvent(common.createEvent('pointermove', map.current.ol, 10));
        map.current.ol.dispatchEvent(common.createEvent('pointermove', map.current.ol, 0));
        expect(handlerProps['onPointerEnter']).toHaveBeenCalledTimes(4);
        expect(handlerProps['onPointerLeave']).toHaveBeenCalledTimes(4);

        map.current.ol.dispatchEvent(common.createEvent('pointerdrag', map.current.ol, 10, true));
        map.current.ol.dispatchEvent(common.createEvent('pointermove', map.current.ol, 0));
        expect(handlerProps['onPointerEnter']).toHaveBeenCalledTimes(4);
        expect(handlerProps['onPointerLeave']).toHaveBeenCalledTimes(4);
        expect(handlerProps['onPointerDragEnd']).toHaveBeenCalledTimes(2);

        expect(RFeature.lastFeaturesDragged.length).toBe(0);
        expect(RFeature.lastFeaturesEntered.length).toBe(0);
    });
    it('should throw an error without a Layer', () => {
        const err = console.error;
        console.error = () => undefined;
        expect(() => render(<RFeature />)).toThrow('must be part of');
        console.error = err;
    });
});
