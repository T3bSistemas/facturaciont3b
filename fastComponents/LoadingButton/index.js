import LoadingButton from '@mui/lab/LoadingButton';

export default function loadingButton({label, click, loading, variant, icon, color, fullWidth, disabled, size}){
    return (
        <LoadingButton onClick={(click)?click:null} loading={(loading)?loading:false} variant={(variant)?variant:'contained'} startIcon={(icon)?icon:null} color={(color)?color:'primary'} fullWidth={(fullWidth)?fullWidth:false} size={((size)?size:'small')} disabled={disabled}>
            {label}
        </LoadingButton>
    )
}