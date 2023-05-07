import Checkbox from './FormCheckbox'

/**
 * Sisältää uuden arvostelun lisäyslomakkeen checkboxit
 */

const FormCheckboxContainer = ({ labels }) => {

    /**
     * Luo checkbox-elementtejä saamastaan listasta
     */
    const checkboxes = labels.map(label => {
        return <Checkbox label={label} />
    });

    return (
      <div>{checkboxes}</div>
    );
  };
  export default FormCheckboxContainer