import {useEffect} from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-twilight.css';
import 'prismjs/components/prism-typescript';

const PrismLoader: React.FC = () => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return <div className="hidden"></div>;
};

export default PrismLoader;
