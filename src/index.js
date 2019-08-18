import React, { useRef, useState, useEffect } from 'react';

const DimensionsReflection = React.createContext(null);

export const Provider = (props)=>{
  const domNode = useRef(null);
  const [dimensions, setDimensions] = useState({});
	const [invocationContext, setInvocationContext] = useState(0);

  useEffect(()=>{
    setDimensions(domNode.current.getBoundingClientRect());
  },[]);

  useEffect(()=>{
    window.addEventListener('resize', getNodeDimensions);
    return ()=>{ window.removeEventListener('resize', getNodeDimensions)};
  }, []);

  const getNodeDimensions = ()=>{
    clearTimeout(invocationContext);
    setInvocationContext(()=>setTimeout(()=>{
	      setDimensions(domNode.current.getBoundingClientRect());
	    }, 100)
		);
  };

  return (
      <div ref={domNode} style={{height: '100%'}}>
        <DimensionsReflection.Provider value={dimensions}>
					{props.children}
        </DimensionsReflection.Provider>
      </div>
  )
};

export const withContext=(ChildComponent)=>{
	return (props)=>(
			<DimensionsReflection.Consumer>
				{(dims)=>(<ChildComponent {...props} incomingDims={dims} />)}
			</DimensionsReflection.Consumer>
		)
};
