import {DecodeToken} from '../Util/DecodeToken'
import {GetBase64ByImage} from '../Util/GetBase64ByImage'
import {translateBy,ShowSnackbar,ConvertMnToHour,GetURLPreviewIframe} from '../Util/globalUtils'
import NoData from '../../public/Icon/no-data.svg';
import DefaultImage from '../../public/Image/DefaultImage/default.jpg';
import ComingSoon from '../../public/Image/DefaultImage/comming.jpg';
import defaultUserImage from '../../public/Image/DefaultImage/User.jpg';
import defaultUserImage2 from '../../public/Image/DefaultImage/user2.png';
import defaultNoBackground1 from '../../public/Image/DefaultImage/no-bg.png';
import defaultNoBackground2 from '../../public/Image/DefaultImage/noBackground.jpg';
import {QueryParam} from './QueryParam';
export default  {
    DecodeToken : DecodeToken,
    GetBase64ByImage : GetBase64ByImage,
    translate : translateBy,
    snackbar : ShowSnackbar,
    convertTime : ConvertMnToHour,
    NodataImage :NoData,
    DefaultImage:DefaultImage,
    QueryParam:QueryParam,
    ComingSoon : ComingSoon,
    UserDefaultImage : defaultUserImage,
    UserDefaultImage2 : defaultUserImage2,
    NoBackground1 : defaultNoBackground1,
    NoBackground2 : defaultNoBackground2,
    GetURLPreviewIframe:GetURLPreviewIframe,
}