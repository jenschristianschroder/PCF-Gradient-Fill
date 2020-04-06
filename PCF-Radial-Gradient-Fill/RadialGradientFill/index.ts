import {IInputs, IOutputs} from "./generated/ManifestTypes";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class RadialGradientFill implements ComponentFramework.StandardControl<IInputs, IOutputs> {
	
	// Cached context object for the latest updateView
	private contextObj: ComponentFramework.Context<IInputs>;

	private controlId: string;

	private controlWidth: number | null;
	private controlHeight: number | null;

	private offsetStart: number;
	private offsetEnd: number;
	// Div element created as part of this control's main container
	private mainContainer: HTMLDivElement;

	// Image element created as part of this control's table
	private svgContainer: HTMLDivElement;
	
	private rotation: number | null;
	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		// Add control initialization code
		this.controlId = Random.newString();

		// Need to track container resize so that control could get the available width. The available height won't be provided even this is true
		context.mode.trackContainerResize(true);

		this.contextObj = context;

		// Create main table container div. 
		this.mainContainer = document.createElement("div");
		this.mainContainer.classList.add("main-container");
		
		// Create data table container div. 
		this.svgContainer = document.createElement("div");
		this.svgContainer.classList.add("svg-container");
		this.svgContainer.setAttribute("id", "svg-container");

		this.svgContainer.innerHTML = "<svg width='500' height='500' viewBox='0 0 500 500'>" +
											"<defs>"
											"<linearGradient id='" + this.controlId + "gradient'>"
												"<stop offset='4%'  stop-color='black' />" +
												"<stop offset='94%' stop-color='white' />" +
											"</linearGradient>" +
										"</defs>" +
											"<g>" +
												"<rect x='0' y='0' width='500' height='500' style='fill: url(\"#" + this.controlId + "gradient\");'></rect>" +
											"</g>" +
										"</svg>";

		container.appendChild(this.mainContainer);
		this.mainContainer.appendChild(this.svgContainer);
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		// Add code to update control view
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}

}

class Random {
	static newString() {
		return 'axxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0,
			v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
		});
	}
}