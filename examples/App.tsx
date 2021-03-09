/* eslint-disable @typescript-eslint/ban-ts-comment */
import 'bootstrap/dist/css/bootstrap.min.css';
import './example.css';
import './ghp.css';
import React from 'react';
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';

import Simple from './Simple';
// @ts-ignore
import SimpleJSX from '!!raw-loader!./Simple.tsx';
import Layers from './Layers';
// @ts-ignore
import LayersJSX from '!!raw-loader!./Layers.tsx';
import Controls from './Controls';
// @ts-ignore
import ControlsJSX from '!!raw-loader!./Controls.tsx';
import Overlays from './Overlays';
// @ts-ignore
import OverlaysJSX from '!!raw-loader!./Overlays.tsx';
import Popups from './Popups';
// @ts-ignore
import PopupsJSX from '!!raw-loader!./Popups.tsx';
import Features from './Features';
// @ts-ignore
import FeaturesJSX from '!!raw-loader!./Features.tsx';
import PinDrop from './PinDrop';
// @ts-ignore
import PinDropJSX from '!!raw-loader!./PinDrop.tsx';
import Reprojection from './Reprojection';
// @ts-ignore
import ReprojectionJSX from '!!raw-loader!./Reprojection.tsx';
import IGC from './IGC';
// @ts-ignore
import IGCJSX from '!!raw-loader!./IGC.tsx';
import Heatmap from './Heatmap';
// @ts-ignore
import HeatmapJSX from '!!raw-loader!./Heatmap.tsx';
import Cluster from './Cluster';
// @ts-ignore
import ClusterJSX from '!!raw-loader!./Cluster.tsx';
import Overview from './Overview';
// @ts-ignore
import OverviewJSX from '!!raw-loader!./Overview.tsx';
import VectorTiles from './VectorTiles';
// @ts-ignore
import VectorTilesJSX from '!!raw-loader!./VectorTiles.tsx';
import Interactions from './Interactions';
// @ts-ignore
import InteractionsJSX from '!!raw-loader!./Interactions.tsx';
import Spinner from './Spinner';
// @ts-ignore
import SpinnerJSX from '!!raw-loader!./Spinner.tsx';
import Extent from './Extent';
// @ts-ignore
import ExtentJSX from '!!raw-loader!./Extent.tsx';
import Animation from './AnimatedOverlay';
// @ts-ignore
import AnimationJSX from '!!raw-loader!./AnimatedOverlay.tsx';
import GeoData from './GeoData';
// @ts-ignore
import GeoDataJSX from '!!raw-loader!./GeoData.tsx';
import Draw from './Draw';
// @ts-ignore
import DrawJSX from '!!raw-loader!./Draw.tsx';

const LeftMenuItem = (props): JSX.Element => (
    <Link to={props.id}>
        <Button block={true} variant='light'>
            {props.title}
        </Button>
    </Link>
);

const examples = {
    simple: {title: 'Simple map', comp: Simple, code: SimpleJSX},
    controls: {title: 'Custom controls', comp: Controls, code: ControlsJSX},
    overlays: {title: 'Simple overlay', comp: Overlays, code: OverlaysJSX},
    extent: {title: 'Constrained view', comp: Extent, code: ExtentJSX},
    animation: {title: 'Animated icon', comp: Animation, code: AnimationJSX},
    overview: {title: 'Overview', comp: Overview, code: OverviewJSX},
    popups: {title: 'Popups', comp: Popups, code: PopupsJSX},
    features: {title: 'GeoJSON', comp: Features, code: FeaturesJSX},
    cluster: {title: 'Clustering', comp: Cluster, code: ClusterJSX},
    heatmap: {title: 'Heatmap', comp: Heatmap, code: HeatmapJSX},
    layers: {title: 'Multiple layers', comp: Layers, code: LayersJSX},
    pindrop: {title: 'Drop a pin', comp: PinDrop, code: PinDropJSX},
    spinner: {title: 'Spinner', comp: Spinner, code: SpinnerJSX},
    geodata: {title: 'Infographics', comp: GeoData, code: GeoDataJSX},
    interactions: {title: 'Move & Select', comp: Interactions, code: InteractionsJSX},
    draw: {title: 'Draw & Modify', comp: Draw, code: DrawJSX},
    vectortiles: {title: 'Vector tiles', comp: VectorTiles, code: VectorTilesJSX},
    reproj: {title: 'Reprojection', comp: Reprojection, code: ReprojectionJSX},
    igc: {title: 'Performance', comp: IGC, code: IGCJSX}
};

// These two bring in huge bundles and are lazy-loaded
const ReadmeBlock = React.lazy(() => import('./ReadmeBlock'));
const CodeBlock = React.lazy(() => import('./CodeBlock'));

const App = (): JSX.Element => {
    return (
        <Router>
            <h1 className='m-2'>
                <strong>rlayers Examples</strong>
            </h1>
            <div className='d-flex flex-row p-3'>
                <div className='d-flex flex-column left-menu mr-1'>
                    <LeftMenuItem id={''} title={'Home'} />
                    {Object.keys(examples).map((e) => (
                        <LeftMenuItem key={e} id={e} title={examples[e].title} />
                    ))}
                </div>
                <div className='d-flex flex-column w-100 overflow-hidden'>
                    <div className='fluid-container'>
                        <Route exact path='/'>
                            <div className='ml-2'>
                                <React.Suspense fallback={<div>Loading...</div>}>
                                    <ReadmeBlock />
                                </React.Suspense>
                            </div>
                        </Route>
                        {Object.keys(examples).map((e) => (
                            <Route key={e} path={`/${e}`}>
                                <div className='row'>
                                    <div className='col-12 col-xl-5'>{examples[e].comp()}</div>
                                    <div className='col-12 col-xl-7'>
                                        <React.Suspense fallback={<div>Parsing code...</div>}>
                                            <CodeBlock code={examples[e].code} />
                                        </React.Suspense>
                                    </div>
                                </div>
                            </Route>
                        ))}
                    </div>
                </div>
            </div>
        </Router>
    );
};

export default App;
