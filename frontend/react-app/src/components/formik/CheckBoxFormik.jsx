export const CheckBoxFormik = ({
    field,
    form,
    id,
    name
}) => {

    // on status change in checkbox
    const onChange = () => {
        // change value in formik
        form.setFieldValue(
            field.name,
            !field.value,
        );
    }

    return (
        <div className="flex items-center ml-4">
            <div className="text-sm text-slate-400 italic mr-2">{field.value ? 'On' : 'Off'}</div>
            <div className="form-switch">
                <input type="checkbox" id={id} className="sr-only" name={name} checked={field.value} onChange={onChange} />
                <label className="bg-slate-400" htmlFor={id}>
                    <span className="bg-white shadow-sm" aria-hidden="true"></span>
                    <span className="sr-only">Enable smart sync</span>
                </label>
            </div>
        </div>
    )

}