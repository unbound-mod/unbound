const { Icon, Text, FormTitle, Button } = require('@components');
const { React, ReactSpring } = require('@webpack/common');
const Component = require('@structures/component');
const { getByProps } = require('@webpack');

const Markdown = getByProps('reactParserFor', 'parse');
const Parser = Markdown?.reactParserFor?.(Markdown.defaultRules);

const { useSpring, useTransition, animated } = ReactSpring;

module.exports = class Toast extends Component {
   constructor() {
      super();

      this.spring = null;
      this.timeout = null;
      this.ref = React.createRef();
      this.state = {
         closing: false
      };
   }

   componentWillUnmount() {
      if (this.observer) this.observer.disconnect();
   }

   componentDidUpdate(prev) {
      if (prev.closing !== this.props.closing) {
         this.setState({ closing: this.props.closing });
      }
   }

   render() {
      const {
         icon: CustomIcon,
         color,
         title,
         manager,
         content,
         position,
         store,
         id,
         timeout,
         onClose,
         buttons
      } = this.props;

      const progress = useSpring({
         from: {
            value: 0
         },
         to: {
            value: 100
         },
         config: (key) => {
            switch (key) {
               case 'value': return {
                  duration: timeout
               };

               default: return {
                  duration: 0
               };
            }
         }
      });

      const isFromTop = position.includes('top');
      const spring = {
         config: {
            mass: 1,
            tension: 185,
            friction: 26
         },
         from: {
            opacity: 1,
            height: 0,
            transform: `translateY(${isFromTop ? '-100%' : 0}) scale(1)`
         },
         enter: () => (next) => next({
            opacity: 1,
            height: this.ref.current?.getBoundingClientRect().height ?? 'auto',
            transform: `translateY(0) scale(1)`
         }),
         leave: {
            opacity: 0,
            height: 0,
            transform: `translateY(0) scale(0.75)`
         },
         onRest: () => {
            if (this.state.closing) {
               store.delete(id);
            }
         }
      };

      const transition = useTransition(!this.state.closing, spring);

      return <>
         {transition((props, item) => item && (<animated.div
            key={id}
            onMouseEnter={() => progress.value.pause()}
            onMouseLeave={() => progress.value.resume()}
            className='unbound-toast-wrapper'
            style={{ opacity: props.opacity, height: props.height }}
         >
            <animated.div
               ref={this.ref}
               data-color={color}
               style={{
                  transform: props.transform,
                  '--color': color
               }}
               className='unbound-toast'
            >
               <div className='unbound-toast-header' data-has-content={Boolean(content)}>
                  {typeof CustomIcon === 'function' && <CustomIcon className='unbound-toast-icon' />}
                  {title && <FormTitle className='unbound-toast-title' tag='h3'>
                     {this.parse(title)}
                  </FormTitle>}
                  <Icon
                     className='unbound-toast-close'
                     name='Close'
                     onClick={() => {
                        manager.close(id);
                        onClose?.();
                     }}
                     onContextMenu={() => {
                        manager.closeAll();
                        onClose?.();
                     }}
                  />
               </div>
               <Text className='unbound-toast-content'>{this.parse(content)}</Text>
               {Array.isArray(buttons) && buttons.length && <div className='unbound-toast-buttons'>
                  {buttons.map((button, i) =>
                     <Button
                        color={Button.Colors[button.color?.toUpperCase() ?? 'BRAND_NEW']}
                        look={Button.Looks[button.look?.toUpperCase() || 'FILLED']}
                        size={Button.Sizes[button.size?.toUpperCase() || 'MIN']}
                        key={`button-${i}`}
                        className='unbound-toast-button'
                        onClick={() => {
                           button.onClick?.();
                           (button.close ?? true) && manager.close(id);
                        }}
                     >
                        {button.text}
                     </Button>
                  )}
               </div>}
               {timeout > 0 && <div className='unbound-toast-progress'>
                  <animated.div
                     className='unbound-toast-progress-bar'
                     style={{
                        width: progress.value.to(e => {
                           if (e >= 100 && timeout !== 0 && !this.state.closing) {
                              this.setState({ closing: true });
                           }

                           return `${e}%`;
                        })
                     }}
                  />
               </div>}
            </animated.div>
         </animated.div>
         ))}
      </>;
   }

   parse(content) {
      try {
         return Parser(content);
      } catch {
         return content;
      }
   }
};;