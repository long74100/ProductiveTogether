import React from 'react';

import CreatableSelect from 'react-select/creatable';

/**
 * Tsx version broken 
 */
const CreatableSingleSelect = (props) => {
  const handleChange = ({ value }, actionMeta) => {
    props.handleChange(value);
  };

  const handleInputChange = (inputValue, actionMeta) => {
  };

  return (
    <CreatableSelect
      isClearable
      onChange={handleChange}
      onInputChange={handleInputChange}
      options={props.options || []}
    />
  );
}

export default CreatableSingleSelect;