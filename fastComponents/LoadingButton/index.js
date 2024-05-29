import LoadingButton from '@mui/lab/LoadingButton';
import Typography    from '@mui/material/Typography'

export default function loadingButton({label, click, loading, variant, icon, color, fullWidth, disabled, size}){
    return (
            <LoadingButton onClick={(click)?click:null} loading={(loading)?loading:false} variant={(variant)?variant:'contained'} startIcon={(icon)?icon:null} color={(color)?color:'primary'} fullWidth={(fullWidth)?fullWidth:false} size={((size)?size:'small')} disabled={disabled}
             sx={{
                borderRadius : '24px',
                display: 'flex',
                height: '44px',
                padding: '12px 5px',
                justifyContent: 'center',
                alignItems: 'center',
                flexShrink: '0',
                textTransform: 'none',
                background: (variant)?(variant === 'contained')?'#ED1E24':'none':'none',
                boxShadow: 'none',
                textTransform: 'none',
                borderColor: '#ED1E24',
                '&:hover': {
                  backgroundColor: (variant)?(variant === 'contained')?'#CC1A1F':'none':'none',
                  borderColor: (variant)?(variant === 'contained')?'#CC1A1F':'none':'none',
                  boxShadow: 'none',
                },
                '&:active': {
                  boxShadow: 'none',
                  backgroundColor: (variant)?(variant === 'contained')?'#ED1E24':'none':'none',
                  borderColor: (variant)?(variant === 'contained')?'#ED1E24':'none':'none',
                },
                '&:focus': {
                  boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.10)',
                },
              }}
              disableRipple>
                <Typography sx={{color:(variant)&&(variant === 'outlined')&&'#ED1E24', fontSize: '18px'}} >{label}</Typography>
            </LoadingButton>
    )
}