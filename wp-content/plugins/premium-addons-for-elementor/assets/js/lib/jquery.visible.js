(function($){

    /**
     * Copyright 2012, Digital Fusion
     * @author Sam Sehnert
     */
    var $w=$(window);
    $.fn.visible = function(partial,hidden,direction,container){
        if (this.length < 1)
            return;
            direction = direction || 'both';
            var $t      = this.length > 1 ? this.eq(0) : this,
						isContained = typeof container !== 'undefined' && container !== null,
						$c				  = isContained ? $(container) : $w,
						wPosition        = isContained ? $c.position() : 0,
            t           = $t.get(0),
            vpWidth     = $c.outerWidth(),
            vpHeight    = $c.outerHeight(),
            clientSize  = hidden === true ? t.offsetWidth * t.offsetHeight : true;
        if (typeof t.getBoundingClientRect === 'function'){
            var rec = t.getBoundingClientRect();
                var tViz = isContained ?
												rec.top - wPosition.top >= 0 && rec.top < vpHeight + wPosition.top :
												rec.top >= 0 && rec.top < vpHeight,
                bViz = isContained ?
												rec.bottom - wPosition.top > 0 && rec.bottom <= vpHeight + wPosition.top :
												rec.bottom > 0 && rec.bottom <= vpHeight,
                vVisible   = partial ? tViz || bViz : tViz && bViz,
                vVisible = (rec.top < 0 && rec.bottom > vpHeight) ? true : vVisible;
                return clientSize && vVisible;
        } else {
            var viewTop 				= isContained ? 0 : wPosition,
                viewBottom      = viewTop + vpHeight,
                position          = $t.position(),
                _top            = position.top,
                _bottom         = _top + $t.height(),
                compareTop      = partial === true ? _bottom : _top,
                compareBottom   = partial === true ? _top : _bottom;
            return !!clientSize && ((compareBottom <= viewBottom) && (compareTop >= viewTop));
        }
    };
})(jQuery);