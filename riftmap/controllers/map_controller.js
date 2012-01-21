steal( 'jquery/controller',
       'jquery/view/ejs',
	   'jquery/dom/form_params',
	   'jquery/controller/view',
	   'riftmap/models',
	   'jquery/class',
	   'riftmap/classes/pushpinfactory.js'
	   )
	.then(function($){
$.Controller('Riftmap.Controllers.Map',
{
	init : function(lakeId){
		
       	Riftmap.Models.Localelabel.findForZoomLevel(10, lakeId, this.callback(this.zoomToLocales));         	
	},
	
	zoomToLocales : function(locales){
		
		var locations = Riftmap.Models.Localelabel.localesToLocations(locales);
		
		var locationRect = Microsoft.Maps.LocationRect.fromLocations(locations);
		
		if(this.map === undefined){
 			this.createMap(locationRect);
		}
		else{
			this.map.setView({bounds : locationRect});
		}
		
		var mapViewBounds = new Microsoft.Maps.LocationRect(locationRect.center, locationRect.width + 10, locationRect.Height + 10);
		
		this.limitlocrec = mapViewBounds;			          
	},
	
	createMap : function(bounds){
		
		this.map = new Microsoft.Maps.Map(document.getElementById("MapContainer"),
	        {
	            credentials: "AsZr5U9t2cAH1YZh8fMdisYJ3479SF2aw4MqdnC8-cK8bnHS_qpyNeAvXdXg8WID",
	            mapTypeId: Microsoft.Maps.MapTypeId.aerial,
	            bounds: bounds,
	            showScalebar: false,
	            enableSearchLogo: false,
	            enableClickableLogo: false,
	            showMapTypeSelector: false,
	            labelOverlay: Microsoft.Maps.LabelOverlay.hidden
	        });
	        
        //attach events        
        Microsoft.Maps.Events.addHandler(this.map, 'viewchangeend', this.callback('onViewChangeEnd'));
        
        var northEast = bounds.getNorthwest();
        
        northEast.longitude += bounds.width;
        
        var southWest = bounds.getSoutheast();
        
        southWest.longitude -= bounds.width;
        
        var polygon = new Microsoft.Maps.Polygon([bounds.getNorthwest(),northEast, bounds.getSoutheast(), southWest]);
        
        
        this.map.entities.push(polygon);
        
     	Microsoft.Maps.Events.addHandler(this.map, "viewchangestart", this.callback("applyZoomPanRestrictions"));
     	
        Microsoft.Maps.Events.addHandler(this.map, "viewchangeend", this.callback("applyZoomPanRestrictions"));
        
        //create layers
        this.labelsLayer = new Microsoft.Maps.EntityCollection();
        
        
        this.map.entities.push(this.labelsLayer);
	},
	
	onViewChangeEnd : function(){
		
		Riftmap.Models.Localelabel.findForZoomLevel(this.map.getZoom(), 1, this.callback('onGetLocaleData'));
	},
	
	onGetLocaleData : function(data){
		
		this.labelsLayer.clear();
		
		var self = this;
				
		$.each(data, function(index, element){
			
			var location = element.getLocation();
			
			if(self.map.getBounds().contains(location)){
				
	        	var pin = new Microsoft.Maps.Pushpin(location, { text: element.Name, 
	        														icon: '', 
        															width: 200, 
        															height: 50, 
        															zIndex: 500,
        															typeName: "riftMapPin id_" + element.Id, 
        															textOffset: new Microsoft.Maps.Point(0, 35) 
    															});
        	
				self.labelsLayer.push(pin);
			}
		});
		
		$('[class*="riftMapPin"]').fadeIn('fast');	
	},
		
    applyZoomPanRestrictions: function () {
        var min = this.map.getZoomRange().min;
        var cancelchange = false;
        var newzoom = this.map.getTargetZoom();
        var newcenter = this.map.getTargetCenter();
        var target = this.map.getTargetBounds();

        // check if we need to limit pan
        if (!this.limitlocrec.contains(target.getNorthwest()) || !this.limitlocrec.contains(target.getSoutheast())) {
            steal.dev.log("out of bounds");

            //need to work out which bounds have been exceeeded and set new view appropriately
            var limitnw = this.limitlocrec.getNorthwest();
            var limitse = this.limitlocrec.getSoutheast();
            var targetnw = target.getNorthwest();
            var targetse = target.getSoutheast();

            if ((Math.round(targetnw.latitude * 100000) / 100000) > limitnw.latitude) {
                // move center by difference
                newcenter.latitude = newcenter.latitude - (targetnw.latitude - limitnw.latitude);
            }
            // currently assuming cannot have targetbounds containing limitbounds, so only one corner of bounds limit can be exceeded at a time
            else if ((Math.round(targetse.latitude * 100000) / 100000) < limitse.latitude) {
                // move center by difference
                newcenter.latitude = newcenter.latitude + (limitse.latitude - targetse.latitude);
            }

            if ((Math.round(targetnw.longitude * 100000) / 100000) < limitnw.longitude) {
                // move center by difference
                newcenter.longitude = newcenter.longitude + (limitnw.longitude - targetnw.longitude);
            }
            // currently assuming cannot have targetbounds containing limitbounds, so only one corner of bounds limit can be exceeded at a time
            else if ((Math.round(targetse.longitude * 100000) / 100000) > limitse.longitude) {
                // move center by difference
                newcenter.longitude = newcenter.longitude - (targetse.longitude - limitse.longitude);
            }

            cancelchange = true;
        }


        if (this.map.getTargetZoom() < min) {
            cancelchange = true;
            newzoom = min;
        }
        else {
            var max = this.map.getZoomRange().max;

            if (this.map.getTargetZoom() > max) {
                cancelchange = true;
                newzoom = max;
            }
        }

        if (cancelchange) {
            // change has been canceled so set to canceled zoom and center
            this.map.setView({
                center: newcenter,
                zoom: newzoom
            });

            // raise mouse up on map root element to stop pan
            $(this.map.getRootElement().children[1].children[1]).trigger("click");
        }
        else {
            // publish target view changed
            var bounds = this.map.getBounds();
            var northWest = bounds.getNorthwest();
            var southEast = bounds.getSoutheast();

            this.publish("maptargetview.changed", {
                topLeft: { latitude: northWest.latitude, longitude: northWest.longitude },
                bottomRight: { latitude: southEast.latitude, longitude: southEast.longitude },
                zoomLevel: this.map.getTargetZoom()
            });
        }
    }
})
})