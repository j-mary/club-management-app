const everyFieldIsValid = async (field, fieldValues, modelToCheck) => {
  try {
    const checkOperation = fieldValues
      .map(fieldValue => modelToCheck.findOne({ [field]: fieldValue }));

    const results = await Promise.all(checkOperation);
    const isValid = results.every(currentValue => currentValue !== null);

    return isValid;
  } catch (error) {
    throw new Error(error);
  }
};

export default everyFieldIsValid;
