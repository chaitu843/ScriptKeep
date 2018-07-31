import $ from '../../node_modules/jquery/dist/jquery';
import '../../node_modules/jquery-ui/ui/widgets/sortable';
import '../../node_modules/jquery-ui/ui/disable-selection';

$(() => {
  $('#content').sortable();
  $('#content').disableSelection();
});
