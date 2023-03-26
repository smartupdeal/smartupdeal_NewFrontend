import React from 'react';
import { Collapse} from 'reactstrap';
function CollapseComp(props) {
  const { isOpen, children } = props;
  return (
    <div>
      <Collapse isOpen={isOpen}>{children}</Collapse>
    </div>
  );
}

export default CollapseComp;
