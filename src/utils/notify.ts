import { notifications } from '@mantine/notifications';


export const notify  = (params: {
    title?: string;
    message: string;
    type: "success" | "error"
}) => {
    notifications.show({
        title: params.title,
        message: params.message,
        color: params.type === "success"? "green" : "red"
    })
}