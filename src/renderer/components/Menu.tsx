import * as React from 'react';
import { Message, Icon } from 'semantic-ui-react'

export interface Props {
}

export interface State {
}

export default class Menu extends React.Component<Props, State> {
    style = {
        width: 40,
        height: '100%',
        background: 'blue',
    }

    constructor(props: Props) {
        super(props)
    }

    render(): JSX.Element {
        return (
            <div style={this.style}>
                {this.props.children}
            </div>
        )
    }
}