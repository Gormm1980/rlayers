(self.webpackChunkrlayers=self.webpackChunkrlayers||[]).push([[2997],{2997:(n,s,a)=>{"use strict";a.r(s),a.d(s,{default:()=>t});const t='<span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">"react"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> proj4 <span class="token keyword">from</span> <span class="token string">"proj4"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> fromLonLat <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"ol/proj"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> register <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"ol/proj/proj4"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token string">"ol/ol.css"</span><span class="token punctuation">;</span>\n\n<span class="token keyword">import</span> <span class="token punctuation">{</span> RMap<span class="token punctuation">,</span> <span class="token constant">ROSM</span><span class="token punctuation">,</span> RLayerWMTS <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"rlayers"</span><span class="token punctuation">;</span>\n\n<span class="token comment">// British National Grid definition (EPSG:27700)</span>\nproj4<span class="token punctuation">.</span><span class="token function">defs</span><span class="token punctuation">(</span>\n  <span class="token string">"EPSG:27700"</span><span class="token punctuation">,</span>\n  <span class="token string">"+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 "</span> <span class="token operator">+</span>\n    <span class="token string">"+x_0=400000 +y_0=-100000 +ellps=airy "</span> <span class="token operator">+</span>\n    <span class="token string">"+towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 "</span> <span class="token operator">+</span>\n    <span class="token string">"+units=m +no_defs"</span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">register</span><span class="token punctuation">(</span>proj4<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">Reprojection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token constant">JSX</span><span class="token punctuation">.</span>Element <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token punctuation">(</span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">RMap</span></span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>example-map<span class="token punctuation">"</span></span> <span class="token attr-name">center</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token function">fromLonLat</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span> <span class="token attr-name">zoom</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token number">5</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">ROSM</span></span> <span class="token punctuation">/></span></span><span class="token plain-text">\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">RLayerWMTS</span></span>\n        <span class="token attr-name">zIndex</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token number">5</span><span class="token punctuation">}</span></span>\n        <span class="token attr-name">projection</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>EPSG:27700<span class="token punctuation">"</span></span>\n        <span class="token attr-name">attributions</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Contains OS data © Crown Copyright and database right<span class="token punctuation">"</span></span>\n        <span class="token attr-name">url</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://tiles.arcgis.com/tiles/qHLhLQrcvEnxjtPr/arcgis/rest/services/OS_Open_Raster/MapServer/WMTS<span class="token punctuation">"</span></span>\n        <span class="token attr-name">layer</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>OS_Open_Raster<span class="token punctuation">"</span></span>\n      <span class="token punctuation">/></span></span><span class="token plain-text">\n    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">RMap</span></span><span class="token punctuation">></span></span>\n  <span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n'}}]);