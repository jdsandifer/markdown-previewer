$('document').ready(function() {
    class MarkupPreviewer extends React.Component {
        constructor(props) {
            super(props)
            this.state = {markup: 'some test **markup**'}
            this.updateMarkup = this.updateMarkup.bind(this)
        }
        
        updateMarkup(newMarkup) {
            this.setState({markup: newMarkup})
        }
        
        render() {
            const markup = this.state.markup
            
            return React.createElement(
                'div', 
                {className: 'previewer'}, 
                [
                    React.createElement(
                        MarkupArea, 
                        {
                            className: 'markdown', 
                            key: 1,
                            markup: markup,
                            onMarkupChange: this.updateMarkup
                        },
                        null
                    ),
                    React.createElement(
                        ResultArea, 
                        {
                            className: 'result', 
                            key: 2,
                            markup: markup
                        },
                        null
                    )
                ]
            )
        }
    }
    
    class MarkupArea extends React.Component {
        constructor(props) {
            super(props)
            this.updateMarkup = this.updateMarkup.bind(this)
        }
        
        updateMarkup(event) {
            const newMarkup = event.target.value
            this.setState({markup: newMarkup})
            this.props.onMarkupChange(newMarkup)
        }
        
        render() {
            return React.createElement(
                'textarea',  
                {
                    className: this.props.className, 
                    defaultValue: this.props.markup,
                    onChange: this.updateMarkup
                }, 
                null
            )
        }
    }
    
    class ResultArea extends React.Component {
        constructor(props) {
            super(props)
        }
        render() {
            return React.createElement(
                'span',  
                {
                    className: this.props.className, 
                    dangerouslySetInnerHTML: { __html: marked(this.props.markup) }
                },
                null
            )
        }
    };

    ReactDOM.render(
        React.createElement(MarkupPreviewer, null, null),
        document.querySelector('.container')
    )
})
