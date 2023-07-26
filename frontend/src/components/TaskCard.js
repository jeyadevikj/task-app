import { Card, CardContent, CardHeader, Divider, Stack, Typography } from "@mui/material"
import "../styles/TaskCard.css"

const TaskCard = ({item}) => {
    return (
        <>
            <Card className="card" variant="outlined">
                <CardHeader titleTypographyProps={{variant:"subtitle2", textAlign:"left"}} title={item.title}/>
                <CardContent>
                    <Typography variant="body2" textAlign={"left"}>
                        {item.description}
                    </Typography>
                </CardContent>
                <Divider/>
                <CardContent>
                    <Stack direction={"row"} justifyContent={"space-between"}>
                        <Typography variant="caption">
                            Status:
                        </Typography>
                        <Typography variant="caption">
                            Priority: 
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>
        </>
    )
}

export default TaskCard