$('document').ready(function() {
    class MarkdownPreviewer extends React.Component {
        constructor(props) {
            super(props)
            this.state = {markdown: this.props.markdown}
            this.updateMarkdown = this.updateMarkdown.bind(this)
        }
        
        updateMarkdown(newMarkdown) {
            this.setState({markdown: newMarkdown})
        }
        
        render() {
            const markdown = this.state.markdown
            
            return React.createElement(
                'div', 
                {className: 'previewer'}, 
                [
                    React.createElement(
                        MarkdownArea, 
                        {
                            className: 'markdown', 
                            key: 1,
                            markdown: markdown,
                            onMarkdownChange: this.updateMarkdown
                        },
                        null
                    ),
                    React.createElement(
                        ResultArea, 
                        {
                            className: 'result', 
                            key: 2,
                            markdown: markdown
                        },
                        null
                    )
                ]
            )
        }
    }
    
    class MarkdownArea extends React.Component {
        constructor(props) {
            super(props)
            this.updateMarkdown = this.updateMarkdown.bind(this)
        }
        
        updateMarkdown(event) {
            const newMarkdown = event.target.value
            this.setState({markdown: newMarkdown})
            this.props.onMarkdownChange(newMarkdown)
        }
        
        render() {
            return React.createElement(
                'textarea',  
                {
                    className: this.props.className, 
                    defaultValue: this.props.markdown,
                    onChange: this.updateMarkdown
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
                    dangerouslySetInnerHTML: { __html: marked(this.props.markdown) }
                },
                null
            )
        }
    };

    ReactDOM.render(
        React.createElement(MarkdownPreviewer, {markdown: "See how your *markdown* will **look!**"}, null),
        document.querySelector('.container')
    )
})
