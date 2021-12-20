import React,{Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './Layout.styles';

class Layout extends Component{
    state={
        open:true
    }

    render(){
        const {classes} = this.props;
        return(
            <div>
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default withStyles(styles)(Layout);