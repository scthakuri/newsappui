import { ViewProps, viewStyle } from 'react-native'

export const HEADER_IMAGE_HEIGHT = 800;

export interface NewsProps {
    id?: number;
    title: string;
    description?: string;
    image: string;
    category?: string;
    style?: ViewProps<viewStyle>;
    published_at:string
}

export const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];