<?php

namespace Elementor;

if( ! defined('ABSPATH') ) exit(); // If this file is called directly, abort.

class Premium_Vscroll extends Widget_Base {
    
    public function getTemplateInstance() {
		return $this->templateInstance = premium_Template_Tags::getInstance();
	}
    
    public function get_name() {
        return 'premium-vscroll';
    }
     
    public function get_title() {
        return \PremiumAddons\Helper_Functions::get_prefix() . ' Vertical Scroll';
    }
    
    public function get_icon() {
        return 'pa-vscroll'; 
    }
    
    public function get_categories() {
        return [ 'premium-elements' ];
    }
    
    public function get_script_depends() {
        return [
            'jquery-visible',
            'premium-addons-js'
        ];
    }
    
    public function is_reload_preview_required() {
        return true;
    }
    
    // Adding the controls fields for the premium vertical scroll
    // This will controls the animation, colors and background, dimensions etc
    protected function _register_controls() {
        
        $this->start_controls_section('content_templates',
            [
                'label'         => esc_html__('Content', 'premium-addons-for-elementor'),
            ]
        );
        
        $this->add_control('template_height_hint',
		  	[
                'label'         => '<span style="line-height: 1.4em;"><b>Important<br></b></span><ul style="line-height: 1.2"><li>1- Section Height needs to be set to default.</li><li>2- It\'s recommended that templates be the same height.</li><li>3- For navigation menu, you will need to add navigation menu items first</li></ul>',
		     	'type'          => Controls_Manager::RAW_HTML,
		     	
		  	]
		);
        
        $this->add_control('content_type',
            [
                'label'         => esc_html__('Content Type', 'premium-addons-for-elementor'),
                'type'          => Controls_Manager::SELECT,
                'options'       => [
                    'ids'           => esc_html__('Section ID', 'premium-addons-for-elementor'),
                    'templates'     => esc_html__('Elementor Templates', 'premium-addons-for-elementor')
                ],
                'default'       => 'templates',
                'description'   => esc_html__('Choose which method you prefer to insert sections.', 'premium-addons-for-elementor')
            ]
        );
        
        $temp_repeater = new REPEATER();
        
        $temp_repeater->add_control('section_template',
		  	[
		     	'label'			=> esc_html__( 'Elementor Template', 'premium-addons-for-elementor' ),
		     	'type'          => Controls_Manager::SELECT2,
		     	'options'       => $this->getTemplateInstance()->get_elementor_page_list(),
		     	'multiple'      => false,
		  	]
		);
        
        $this->add_control('section_repeater',
           [
               'label'          => esc_html__( 'Sections', 'premium-addons-for-elementor' ),
               'type'           => Controls_Manager::REPEATER,
               'fields'         => array_values( $temp_repeater->get_controls() ),
               'condition'      => [
                   'content_type'   => 'templates'
               ]
           ]
        );
        
        $id_repeater = new REPEATER();
        
        $id_repeater->add_control('section_id',
		  	[
		     	'label'			=> esc_html__( 'Section ID', 'premium-addons-for-elementor' ),
		     	'type'          => Controls_Manager::TEXT
		  	]
		);
        
        $this->add_control('id_repeater',
           [
               'label'          => esc_html__( 'Sections', 'premium-addons-for-elementor' ),
               'type'           => Controls_Manager::REPEATER,
               'fields'         => array_values( $id_repeater->get_controls() ),
               'condition'      => [
                   'content_type'   => 'ids'
               ]
           ]
        );
        
        $this->add_control('dots_tooltips_switcher',
            [
                'label'         => esc_html__('Dots Tooltips', 'premium-addons-for-elementor'),
                'type'          => Controls_Manager::SWITCHER,
                'default'       => 'yes'
            ]
        );
        
        $this->add_control('dots_tooltips',
            [
                'label'         => esc_html__('Dots Tooltips Text', 'premium-addons-for-elementor'),
                'type'          => Controls_Manager::TEXT,
                'description'   => esc_html__('Add text for each navigation dot separated by \',\'','premium-addons-for-elementor'),
                'condition'     => [
                    'dots_tooltips_switcher'    => 'yes'
                ]
            ]
        );
        
        $this->end_controls_section();
        
        $this->start_controls_section('nav_menu',
            [
                'label'     => esc_html__('Navigation', 'premium-addons-for-elementor'),
            ]
        );
        
        $this->add_control('nav_menu_switch',
            [
                'label'         => esc_html__('Navigation Menu', 'premium-addons-for-elementor'),
                'type'          => Controls_Manager::SWITCHER,
                'description'   => esc_html__('This option works only on the frontend', 'premium-addons-for-elementor'),
            ]
        );
        
        $this->add_control('navigation_menu_pos',
            [
                'label'         => esc_html__('Position', 'premium-addons-for-elementor'),
                'type'          => Controls_Manager::SELECT,
                'options'       => [
                    'left'  => esc_html__('Left', 'premium-addons-for-elementor'),
                    'right' => esc_html__('Right', 'premium-addons-for-elementor'),
                ],
                'default'       => 'left',
                'condition'     => [
                    'nav_menu_switch'   => 'yes'
                ]
            ]
        );
        
        $this->add_responsive_control('navigation_menu_pos_offset_top',
            [
                'label'         => esc_html__('Offset Top', 'premium-addons-for-elementor'),
                'type'          => Controls_Manager::SLIDER,
                'size_units'    => ['px', '%' ,'em'],
                'selectors'     => [
                    '{{WRAPPER}} .premium-vscroll-nav-menu' => 'top: {{SIZE}}{{UNIT}};'
                ],
                'condition'     => [
                    'nav_menu_switch'   => 'yes',
                ]
            ]
        );
        
        $this->add_responsive_control('navigation_menu_pos_offset_left',
            [
                'label'         => esc_html__('Offset Left', 'premium-addons-for-elementor'),
                'type'          => Controls_Manager::SLIDER,
                'size_units'    => ['px', '%' ,'em'],
                'selectors'     => [
                    '{{WRAPPER}} .premium-vscroll-nav-menu.left' => 'left: {{SIZE}}{{UNIT}};'
                ],
                'condition'     => [
                    'nav_menu_switch'   => 'yes',
                    'navigation_menu_pos'   => 'left'
                ]
            ]
        );
        
        $this->add_responsive_control('navigation_menu_pos_offset_right',
            [
                'label'         => esc_html__('Offset Right', 'premium-addons-for-elementor'),
                'type'          => Controls_Manager::SLIDER,
                'size_units'    => ['px', '%' ,'em'],
                'selectors'     => [
                    '{{WRAPPER}} .premium-vscroll-nav-menu.right' => 'right: {{SIZE}}{{UNIT}};'
                ],
                'condition'     => [
                    'nav_menu_switch'   => 'yes',
                    'navigation_menu_pos'   => 'right'
                ]
            ]
        );
        
        $nav_repeater = new REPEATER();
        
        $nav_repeater->add_control('nav_menu_item',
		  	[
		     	'label'			=> esc_html__( 'List Item', 'premium-addons-for-elementor' ),
		     	'type'          => Controls_Manager::TEXT,
		  	]
		);
        
        $this->add_control('nav_menu_repeater',
           [
               'label'          => esc_html__( 'Menu Items', 'premium-addons-for-elementor' ),
               'type'           => Controls_Manager::REPEATER,
               'fields'         => array_values( $nav_repeater->get_controls() ),
               'title_field'    => '{{{ nav_menu_item }}}',
               'condition'      => [
                   'nav_menu_switch'    => 'yes'
               ]
           ]
        );
        
        $this->add_control('navigation_dots_pos',
            [
                'label'         => esc_html__('Dots Horizontal Position', 'premium-addons-for-elementor'),
                'type'          => Controls_Manager::SELECT,
                'options'       => [
                    'left'  => esc_html__('Left', 'premium-addons-for-elementor'),
                    'right' => esc_html__('Right', 'premium-addons-for-elementor'),
                ],
                'default'       => 'right'
            ]
        );
        
        $this->add_control('navigation_dots_v_pos',
            [
                'label'         => esc_html__('Dots Vertical Position', 'premium-addons-for-elementor'),
                'type'          => Controls_Manager::SELECT,
                'options'       => [
                    'top'   => esc_html__('Top', 'premium-addons-for-elementor'),
                    'middle'=> esc_html__('Middle', 'premium-addons-for-elementor'),
                    'bottom'=> esc_html__('Bottom', 'premium-addons-for-elementor'),
                ],
                'default'       => 'middle'
            ]
        );
        
        $this->end_controls_section();
        
        $this->start_controls_section('advanced_settings',
            [
                'label'         => esc_html__('Scroll Settings', 'premium-addons-for-elementor'),
            ]
        );
        
        $this->add_control('scroll_speed',
            [
                'label'         => esc_html__('Scroll Speed', 'premium-addons-for-elementor'),
                'type'          => Controls_Manager::NUMBER,
                'description'   => esc_html__('Set scolling speed in seconds, default: 0.7', 'premium-addons-for-elementor'),
            ]
        );
        
        $this->add_control('full_section',
            [
                'label'         => esc_html__('Full Section Scroll', 'premium-addons-for-elementor'),
                'type'          => Controls_Manager::SWITCHER,
                'default'       => 'yes',
            ]
        );
        
        $this->end_controls_section();
        
        $this->start_controls_section('navigation_style',
            [
                'label'         => esc_html__('Navigation Dots', 'premium-addons-for-elementor'),
                'tab'           => CONTROLS_MANAGER::TAB_STYLE,
            ]
        );
        
        $this->start_controls_tabs('navigation_style_tabs');
        
        $this->start_controls_tab('tooltips_style_tab',
            [
                'label'         => esc_html__('Tooltips', 'premium-addons-for-elementor'),
                'condition' => [
                    'dots_tooltips_switcher'    => 'yes'
                ]
            ]
        );
        
        $this->add_control('tooltips_color',
            [
                'label'         => esc_html__( 'Tooltips Text Color', 'premium-addons-for-elementor' ),
                'type'          => Controls_Manager::COLOR,
                'scheme'        => [
                    'type'  => Scheme_Color::get_type(), 
                    'value' => Scheme_Color::COLOR_1
                ],
                'selectors'     => [
                    '{{WRAPPER}} .premium-vscroll-tooltip'  => 'color: {{VALUE}};',
                ],
                'condition' => [
                    'dots_tooltips_switcher'    => 'yes'
                ]
            ]
        );
        
        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name'          => 'tooltips_typography',
                'scheme'        => Scheme_Typography::TYPOGRAPHY_1,
                'selector'      => '{{WRAPPER}} .premium-vscroll-tooltip span',
                'condition'     => [
                    'dots_tooltips_switcher'    => 'yes'
                ]
            ]
        );
        
        $this->add_control('tooltips_background',
            [
                'label'         => esc_html__( 'Tooltips Background', 'premium-addons-for-elementor' ),
                'type'          => Controls_Manager::COLOR,
                'scheme'        => [
                    'type'  => Scheme_Color::get_type(), 
                    'value' => Scheme_Color::COLOR_1
                ],
                'selectors'     => [
                    '{{WRAPPER}} .premium-vscroll-tooltip'  => 'background-color: {{VALUE}};',
                    '{{WRAPPER}} .premium-vscroll-inner .premium-vscroll-dots.right .premium-vscroll-tooltip::after' => 'border-left-color: {{VALUE}}',
                    '{{WRAPPER}} .premium-vscroll-inner .premium-vscroll-dots.left .premium-vscroll-tooltip::after' => 'border-right-color: {{VALUE}}',
                ],
                'condition' => [
                    'dots_tooltips_switcher'    => 'yes'
                ]
            ]
        );
        
        $this->add_group_control(
            Group_Control_Border::get_type(),
            [
                'name'          =>  'tooltips_border',
                'selector'      => '{{WRAPPER}} .premium-vscroll-tooltip',
                'condition'     => [
                    'dots_tooltips_switcher'    => 'yes'
                ]
            ]
        );
        
        $this->add_control('tooltips_border_radius',
            [
                'label'         => esc_html__( 'Border Radius', 'premium-addons-for-elementor' ),
                'type'          => Controls_Manager::SLIDER,
                'size_units'    => ['px', 'em', '%'],
                'selectors'     => [
                    '{{WRAPPER}} .premium-vscroll-tooltip'  => 'border-radius: {{SIZE}}{{UNIT}};',
                ],
                'condition'     => [
                    'dots_tooltips_switcher'    => 'yes'
                ]
            ]
        );
        
        $this->add_group_control(
            Group_Control_Box_Shadow::get_type(),
            [
                'name'          => 'tooltips_shadow',
                'selector'      => '{{WRAPPER}} .premium-vscroll-tooltip',
                'condition'     => [
                    'dots_tooltips_switcher'    => 'yes'
                ]
            ]
        );
        
        $this->add_responsive_control('tooltips_margin',
            [
                'label'         => esc_html__('Margin', 'premium-addons-for-elementor'),
                'type'          => Controls_Manager::DIMENSIONS,
                'size_units'    => ['px', 'em', '%'],
                'selectors'     => [
                    '{{WRAPPER}} .premium-vscroll-tooltip' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
                'condition' => [
                    'dots_tooltips_switcher'    => 'yes'
                ]
            ]
        );
        
        $this->add_responsive_control('tooltips_padding',
            [
                'label'         => esc_html__('Padding', 'premium-addons-for-elementor'),
                'type'          => Controls_Manager::DIMENSIONS,
                'size_units'    => ['px', 'em', '%'],
                'selectors'     => [
                    '{{WRAPPER}} .premium-vscroll-tooltip' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
                'condition' => [
                    'dots_tooltips_switcher'    => 'yes'
                ]
            ]
        );
        
        $this->end_controls_tab();

        $this->start_controls_tab('dots_style_tab',
            [
                'label'         => esc_html__('Dots', 'premium-addons-for-elementor'),
            ]
        );
        
        $this->add_control('dots_color',
            [
                'label'         => esc_html__( 'Dots Color', 'premium-addons-for-elementor' ),
                'type'          => Controls_Manager::COLOR,
                'scheme'        => [
                    'type'  => Scheme_Color::get_type(), 
                    'value' => Scheme_Color::COLOR_1
                ],
                'selectors'     => [
                    '{{WRAPPER}} .premium-vscroll-dots .premium-vscroll-nav-link span'  => 'background-color: {{VALUE}};',
                ]
            ]
        );
        
        $this->add_control('active_dot_color',
            [
                'label'         => esc_html__( 'Active Dot Color', 'premium-addons-for-elementor' ),
                'type'          => Controls_Manager::COLOR,
                'scheme'        => [
                    'type'  => Scheme_Color::get_type(), 
                    'value' => Scheme_Color::COLOR_2
                ],
                'selectors'     => [
                    '{{WRAPPER}} .premium-vscroll-dots li.active .premium-vscroll-nav-link span'  => 'background-color: {{VALUE}};',
                ]
            ]
        );
        
        $this->add_control('dots_border_color',
            [
                'label'         => esc_html__( 'Dots Border Color', 'premium-addons-for-elementor' ),
                'type'          => Controls_Manager::COLOR,
                'scheme'        => [
                    'type'  => Scheme_Color::get_type(), 
                    'value'=> Scheme_Color::COLOR_2
                ],
                'selectors'     => [
                    '{{WRAPPER}} .premium-vscroll-dots .premium-vscroll-nav-link span'  => 'border-color: {{VALUE}};',
                ]
            ]
        );
        
        $this->end_controls_tab();
        
        $this->start_controls_tab('container_style_tab',
            [
                'label'         => esc_html__('Container', 'premium-addons-for-elementor'),
            ]
        );
        
        $this->add_control('navigation_background',
            [
                'label'         => esc_html__( 'Background Color', 'premium-addons-for-elementor' ),
                'type'          => Controls_Manager::COLOR,
                'scheme'        => [
                    'type'  => Scheme_Color::get_type(), 
                    'value'=> Scheme_Color::COLOR_1
                ],
                'selectors'     => [
                    '{{WRAPPER}} .premium-vscroll-dots'  => 'background-color: {{VALUE}}'
                ]
            ]
        );
        
        $this->add_control('navigation_border_radius',
            [
                'label'         => esc_html__( 'Border Radius', 'premium-addons-for-elementor' ),
                'type'          => Controls_Manager::SLIDER,
                'size_units'    => ['px', 'em', '%'],
                'selectors'     => [
                    '{{WRAPPER}} .premium-vscroll-dots'  => 'border-radius: {{SIZE}}{{UNIT}};',
                ]
            ]
        );
        
        $this->add_group_control(
            Group_Control_Box_Shadow::get_type(),
            [
                'label'         => esc_html__('Shadow','premium-addons-for-elementor'),
                'name'          => 'navigation_box_shadow',
                'selector'      => '{{WRAPPER}} .premium-vscroll-dots',
            ]
        );
        
        $this->end_controls_tab();
        
        $this->end_controls_tabs();
        
        $this->end_controls_section();
        
        $this->start_controls_section('navigation_menu_style',
            [
                'label'     => esc_html__('Navigation Menu', 'premium-addons-for-elementor'),
                'tab'       => CONTROLS_MANAGER::TAB_STYLE,
                'condition' => [
                    'nav_menu_switch'   => 'yes'
                ]
            ]
        );
        
        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name'          => 'navigation_items_typography',
                'selector'      => '{{WRAPPER}} .premium-vscroll-nav-menu .premium-vscroll-nav-item .premium-vscroll-nav-link'
            ]
        );
        
        $this->start_controls_tabs('navigation_menu_style_tabs');

        $this->start_controls_tab('normal_style_tab',
            [
                'label'         => esc_html__('Normal', 'premium-addons-for-elementor'),
            ]
        );
        
        $this->add_control('normal_color',
            [
                'label'         => esc_html__( 'Text Color', 'premium-addons-for-elementor' ),
                'type'          => Controls_Manager::COLOR,
                'scheme'        => [
                    'type'  => Scheme_Color::get_type(), 
                    'value'=> Scheme_Color::COLOR_1
                ],
                'selectors'     => [
                    '{{WRAPPER}} .premium-vscroll-nav-menu .premium-vscroll-nav-item .premium-vscroll-nav-link'  => 'color: {{VALUE}}'
                ]
            ]
        );
        
        $this->add_control('normal_hover_color',
            [
                'label'         => esc_html__( 'Text Hover Color', 'premium-addons-for-elementor' ),
                'type'          => Controls_Manager::COLOR,
                'scheme'        => [
                    'type'  => Scheme_Color::get_type(), 
                    'value'=> Scheme_Color::COLOR_1
                ],
                'selectors'     => [
                    '{{WRAPPER}} .premium-vscroll-nav-menu .premium-vscroll-nav-item .premium-vscroll-nav-link:hover'  => 'color: {{VALUE}}'
                ]
            ]
        );
        
        $this->add_control('normal_background',
            [
                'label'         => esc_html__( 'Background Color', 'premium-addons-for-elementor' ),
                'type'          => Controls_Manager::COLOR,
                'scheme'        => [
                    'type'  => Scheme_Color::get_type(), 
                    'value'=> Scheme_Color::COLOR_2
                ],
                'selectors'     => [
                    '{{WRAPPER}} .premium-vscroll-nav-menu .premium-vscroll-nav-item'  => 'background-color: {{VALUE}}'
                ]
            ]
        );
        
        $this->add_group_control(
            Group_Control_Box_Shadow::get_type(),
            [
                'label'         => esc_html__('Shadow','premium-addons-for-elementor'),
                'name'          => 'normal_shadow',
                'selector'      => '{{WRAPPER}} .premium-vscroll-nav-menu .premium-vscroll-nav-item'
            ]
        );
        
        $this->end_controls_tab();
        
        $this->start_controls_tab('active_style_tab',
            [
                'label'         => esc_html__('Active', 'premium-addons-for-elementor'),
            ]
        );
        
        $this->add_control('active_color',
            [
                'label'         => esc_html__( 'Text Color', 'premium-addons-for-elementor' ),
                'type'          => Controls_Manager::COLOR,
                'scheme'        => [
                    'type'  => Scheme_Color::get_type(), 
                    'value'=> Scheme_Color::COLOR_2
                ],
                'selectors'     => [
                    '{{WRAPPER}} .premium-vscroll-nav-menu .premium-vscroll-nav-item.active .premium-vscroll-nav-link'  => 'color: {{VALUE}}'
                ]
            ]
        );
        
        $this->add_control('active_hover_color',
            [
                'label'         => esc_html__( 'Text Hover Color', 'premium-addons-for-elementor' ),
                'type'          => Controls_Manager::COLOR,
                'scheme'        => [
                    'type'  => Scheme_Color::get_type(), 
                    'value'=> Scheme_Color::COLOR_2
                ],
                'selectors'     => [
                    '{{WRAPPER}} .premium-vscroll-nav-menu .premium-vscroll-nav-item.active .premium-vscroll-nav-link:hover'  => 'color: {{VALUE}}'
                ]
            ]
        );
        
        $this->add_control('active_background',
            [
                'label'         => esc_html__( 'Background Color', 'premium-addons-for-elementor' ),
                'type'          => Controls_Manager::COLOR,
                'scheme'        => [
                    'type'  => Scheme_Color::get_type(), 
                    'value'=> Scheme_Color::COLOR_1
                ],
                'selectors'     => [
                    '{{WRAPPER}} .premium-vscroll-nav-menu .premium-vscroll-nav-item.active'  => 'background-color: {{VALUE}}'
                ]
            ]
        );
        
        $this->add_group_control(
            Group_Control_Box_Shadow::get_type(),
            [
                'label'         => esc_html__('Shadow','premium-addons-for-elementor'),
                'name'          => 'active_shadow',
                'selector'      => '{{WRAPPER}} .premium-vscroll-nav-menu .premium-vscroll-nav-item.active'
            ]
        );
        
        $this->end_controls_tabs();
        
        $this->add_group_control(
            Group_Control_Border::get_type(), 
            [
                'name'          => 'navigation_items_border',
                'selector'      => '{{WRAPPER}} .premium-vscroll-nav-menu .premium-vscroll-nav-item',
                'separator'     => 'before'
            ]
        );

        $this->add_control('navigation_items_border_radius',
            [
                'label'         => esc_html__('Border Radius', 'premium-addons-for-elementor'),
                'type'          => Controls_Manager::SLIDER,
                'size_units'    => ['px','em','%'],
                'selectors'     => [
                    '{{WRAPPER}} .premium-vscroll-nav-menu .premium-vscroll-nav-item'  => 'border-radius: {{SIZE}}{{UNIT}};',
                ]
            ]
        );
        
        $this->add_responsive_control('navigation_items_margin',
            [
                'label'         => esc_html__('Margin', 'premium-addons-for-elementor'),
                'type'          => Controls_Manager::DIMENSIONS,
                'size_units'    => ['px', 'em', '%'],
                'selectors'     => [
                    '{{WRAPPER}} .premium-vscroll-nav-menu .premium-vscroll-nav-item' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );
        
        $this->add_responsive_control('navigation_items_padding',
            [
                'label'         => esc_html__('Padding', 'premium-addons-for-elementor'),
                'type'          => Controls_Manager::DIMENSIONS,
                'size_units'    => ['px', 'em', '%'],
                'selectors'     => [
                    '{{WRAPPER}} .premium-vscroll-nav-menu .premium-vscroll-nav-item .premium-vscroll-nav-link' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );
        
        $this->end_controls_section();
        
    }
    
    protected function get_template_content( $template_id ) {
        
        $premium_elements_frontend = new Frontend;
         
        $template_content = $premium_elements_frontend->get_builder_content($template_id, true);
        
        return $template_content;
    }
    
    protected function render() {
        
        $settings = $this->get_settings_for_display();
        
        $id = $this->get_id();
        
        $dots_text = explode(',', $settings['dots_tooltips'] );
        
        $this->add_render_attribute( 'vertical_scroll_wrapper', 'class', 'premium-vscroll-wrap' );
        
        $this->add_render_attribute( 'vertical_scroll_wrapper', 'id', 'premium-vscroll-wrap-' . $id );
        
        $this->add_render_attribute( 'vertical_scroll_inner', 'class', array( 'premium-vscroll-inner' ) );
        
        $this->add_render_attribute( 'vertical_scroll_inner', 'id', 'premium-vscroll-' . $id );
        
        $this->add_render_attribute( 'vertical_scroll_dots', 'class', array( 'premium-vscroll-dots', $settings['navigation_dots_pos'], $settings['navigation_dots_v_pos'] ) );
        
        $this->add_render_attribute( 'vertical_scroll_dots_list', 'class', array( 'premium-vscroll-dots-list' ) );
        
        $this->add_render_attribute( 'vertical_scroll_menu', 'id', 'premium-vscroll-nav-menu-' . $id );
        
        $this->add_render_attribute( 'vertical_scroll_menu', 'class', array( 'premium-vscroll-nav-menu', $settings['navigation_menu_pos'] ) );
        
        $this->add_render_attribute( 'vertical_scroll_sections_wrap', 'id', 'premium-vscroll-sections-wrap-' . $id );
        
        $this->add_render_attribute( 'vertical_scroll_sections_wrap', 'class', 'premium-vscroll-sections-wrap' );
        
        $vscroll_settings = [
            'id'        => $id, 
            'speed'     => !empty( $settings['scroll_speed'] ) ? $settings['scroll_speed'] * 1000 : 700,
            'tooltips'  => 'yes' == $settings['dots_tooltips_switcher'] ? true : false,
            'dotsText'  => $dots_text,
            'dotsPos'   => $settings['navigation_dots_pos'],
            'dotsVPos'  => $settings['navigation_dots_v_pos'],
            'fullSection'=> 'yes' == $settings['full_section'] ? true : false
        ];
        
        $templates = 'templates' === $settings['content_type'] ? $settings['section_repeater'] : $settings['id_repeater'];
        
        $checkType = 'templates' === $settings['content_type'] ? true : false;

        $nav_items = $settings['nav_menu_repeater'];
        
        ?>

        <div <?php echo $this->get_render_attribute_string('vertical_scroll_wrapper'); ?> data-settings='<?php echo wp_json_encode($vscroll_settings); ?>'>
            <?php if ('yes' == $settings['nav_menu_switch'] ) : ?>
                <ul <?php echo $this->get_render_attribute_string('vertical_scroll_menu'); ?>>
                    <?php foreach( $nav_items as $index => $item ) : ?>
                        <li data-menuanchor="<?php echo $checkType ? 'section_' . $id . $index : $templates[$index]['section_id']; ?>" class="premium-vscroll-nav-item"><div class="premium-vscroll-nav-link"><?php echo $item['nav_menu_item'] ?></div></li>
                    <?php endforeach; ?>
                </ul>
            <?php endif; ?>
            <div <?php echo $this->get_render_attribute_string('vertical_scroll_inner'); ?>>
                <div <?php echo $this->get_render_attribute_string('vertical_scroll_dots'); ?>>
                    <ul <?php echo $this->get_render_attribute_string('vertical_scroll_dots_list'); ?>>
                        <?php foreach( $templates as $index => $section ) : ?>
                            <li data-index="<?php echo $index; ?>" data-menuanchor="<?php echo $checkType ? 'section_' . $id . $index : $templates[$index]['section_id']; ?>" class="premium-vscroll-dot-item"><div class="premium-vscroll-nav-link"><span></span></div></li>
                        <?php endforeach; ?>
                    </ul>
                </div>
                <?php if( 'templates' === $settings['content_type'] ) : ?>
                    <div <?php echo $this->get_render_attribute_string('vertical_scroll_sections_wrap'); ?>>

                        <?php foreach( $templates as $index => $section ) :
                                $this->add_render_attribute('section_' . $index, 'class', [ 'premium-vscroll-temp', 'premium-vscroll-temp-' . $id ] );
                                $this->add_render_attribute('section_' . $index, 'id', 'section_' . $id . $index );
                            ?>
                            <div <?php echo $this->get_render_attribute_string('section_' . $index); ?>>
                                <?php 
                                    $template_id = $section['section_template'];
                                    echo $this->get_template_content($template_id);
                                ?>
                            </div>
                        <?php endforeach; ?>
                    </div>
                <?php endif; ?>
            </div>
        </div>
        
    <?php }   
}